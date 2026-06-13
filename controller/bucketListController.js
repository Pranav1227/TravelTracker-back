import BucketList from '../model/BucketList.js';
import BucketListPlace from '../model/BucketListPlace.js';
import Place from '../model/Place.js';

// @desc    Get all bucket lists for current user
// @route   GET /api/bucket-lists
export const getBucketLists = async (req, res) => {
  try {
    const bucketLists = await BucketList.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    // Get stats for each bucket list (total places, visited places)
    const listsWithStats = await Promise.all(
      bucketLists.map(async (list) => {
        const places = await BucketListPlace.find({ bucketList: list._id });
        const totalPlaces = places.length;
        const visitedPlaces = places.filter(p => p.isVisited).length;
        return {
          ...list.toObject(),
          totalPlaces,
          visitedPlaces,
        };
      })
    );

    res.json(listsWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single bucket list by ID
// @route   GET /api/bucket-lists/:id
export const getBucketListById = async (req, res) => {
  try {
    const bucketList = await BucketList.findById(req.params.id);

    if (!bucketList) {
      return res.status(404).json({ message: 'Bucket list not found' });
    }

    // Check permissions
    if (bucketList.user.toString() !== req.user._id.toString() && !bucketList.isPublic) {
      return res.status(403).json({ message: 'Not authorized to view this bucket list' });
    }

    const places = await BucketListPlace.find({ bucketList: bucketList._id })
      .populate('place')
      .sort({ order: 1, createdAt: 1 });

    res.json({
      ...bucketList.toObject(),
      places,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new bucket list
// @route   POST /api/bucket-lists
export const createBucketList = async (req, res) => {
  try {
    const { name, isPublic, placeIds } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Bucket list name is required' });
    }

    const bucketList = await BucketList.create({
      user: req.user._id,
      name,
      isPublic: isPublic || false,
    });

    if (placeIds && placeIds.length > 0) {
      const placesToInsert = placeIds.map((placeId, index) => ({
        bucketList: bucketList._id,
        place: placeId,
        order: index,
      }));
      await BucketListPlace.insertMany(placesToInsert);
    }

    res.status(201).json(bucketList);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'You already have a bucket list with this name' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Update a bucket list
// @route   PUT /api/bucket-lists/:id
export const updateBucketList = async (req, res) => {
  try {
    const { name, isPublic, placeIds } = req.body;
    const bucketList = await BucketList.findById(req.params.id);

    if (!bucketList) {
      return res.status(404).json({ message: 'Bucket list not found' });
    }

    if (bucketList.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (name) bucketList.name = name;
    if (isPublic !== undefined) bucketList.isPublic = isPublic;

    await bucketList.save();

    // If placeIds are provided, we need to sync them
    if (placeIds) {
      const currentPlaces = await BucketListPlace.find({ bucketList: bucketList._id });
      const currentPlaceIds = currentPlaces.map(p => p.place.toString());
      
      const toRemove = currentPlaces.filter(p => !placeIds.includes(p.place.toString()));
      const toAdd = placeIds.filter(id => !currentPlaceIds.includes(id));

      // Remove removed places
      if (toRemove.length > 0) {
        await BucketListPlace.deleteMany({ _id: { $in: toRemove.map(p => p._id) } });
      }

      // Add new places
      if (toAdd.length > 0) {
        // Find highest order
        const highestOrder = currentPlaces.length > 0 ? Math.max(...currentPlaces.map(p => p.order)) : 0;
        const placesToInsert = toAdd.map((placeId, index) => ({
          bucketList: bucketList._id,
          place: placeId,
          order: highestOrder + 1 + index,
        }));
        await BucketListPlace.insertMany(placesToInsert);
      }
    }

    res.json(bucketList);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'You already have a bucket list with this name' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Delete a bucket list
// @route   DELETE /api/bucket-lists/:id
export const deleteBucketList = async (req, res) => {
  try {
    const bucketList = await BucketList.findById(req.params.id);

    if (!bucketList) {
      return res.status(404).json({ message: 'Bucket list not found' });
    }

    if (bucketList.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete associated places
    await BucketListPlace.deleteMany({ bucketList: bucketList._id });
    await BucketList.findByIdAndDelete(bucketList._id);

    res.json({ message: 'Bucket list removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle Favorite
// @route   PUT /api/bucket-lists/:id/favorite
export const toggleFavorite = async (req, res) => {
  try {
    const bucketList = await BucketList.findById(req.params.id);

    if (!bucketList) return res.status(404).json({ message: 'Bucket list not found' });
    if (bucketList.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    bucketList.isFavorite = !bucketList.isFavorite;
    await bucketList.save();

    res.json({ isFavorite: bucketList.isFavorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle Place Visited inside a Bucket List
// @route   PUT /api/bucket-lists/:id/places/:placeId/visited
export const togglePlaceVisited = async (req, res) => {
  try {
    const bucketList = await BucketList.findById(req.params.id);

    if (!bucketList) return res.status(404).json({ message: 'Bucket list not found' });
    if (bucketList.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    const blp = await BucketListPlace.findOne({ bucketList: bucketList._id, place: req.params.placeId });
    if (!blp) return res.status(404).json({ message: 'Place not found in this bucket list' });

    blp.isVisited = !blp.isVisited;
    await blp.save();

    res.json({ isVisited: blp.isVisited });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Duplicate a Bucket List
// @route   POST /api/bucket-lists/:id/duplicate
export const duplicateBucketList = async (req, res) => {
  try {
    const original = await BucketList.findById(req.params.id);
    if (!original) return res.status(404).json({ message: 'Bucket list not found' });

    const newName = `${original.name} (Copy)`;
    
    // Check if copy already exists
    const existing = await BucketList.findOne({ user: req.user._id, name: newName });
    if (existing) return res.status(400).json({ message: 'Copy already exists. Please rename it first.' });

    const newList = await BucketList.create({
      user: req.user._id,
      name: newName,
      isPublic: false,
    });

    const originalPlaces = await BucketListPlace.find({ bucketList: original._id });
    if (originalPlaces.length > 0) {
      const newPlaces = originalPlaces.map(p => ({
        bucketList: newList._id,
        place: p.place,
        order: p.order,
        notes: p.notes,
        isVisited: false, // Reset visited status for copy
      }));
      await BucketListPlace.insertMany(newPlaces);
    }

    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
