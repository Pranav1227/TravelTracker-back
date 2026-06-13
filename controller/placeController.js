import Place from '../model/Place.js';
import UserVisit from '../model/UserVisit.js';

// @desc    Get all places (with optional filters)
// @route   GET /api/places
export const getPlaces = async (req, res) => {
  try {
    const { category, country, state, city, search, page = 1, limit = 50, sort = 'name_asc', visitedStatus } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (country) filter.country = country;
    if (state) filter.state = state;
    if (city) filter.city = city;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
      ];
    }

    if (visitedStatus && (visitedStatus === 'visited' || visitedStatus === 'unvisited')) {
      if (req.user && req.user._id) {
        const userVisits = await UserVisit.find({ user: req.user._id }).select('place');
        const visitedPlaceIds = userVisits.map(v => v.place);
        if (visitedStatus === 'visited') {
          filter._id = { $in: visitedPlaceIds };
        } else {
          filter._id = { $nin: visitedPlaceIds };
        }
      } else if (visitedStatus === 'visited') {
        filter._id = { $in: [] };
      }
    }

    let sortOptions = { name: 1 };
    if (sort === 'name_desc') sortOptions = { name: -1 };
    else if (sort === 'recent') sortOptions = { createdAt: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Place.countDocuments(filter);
    const places = await Place.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Calculate nested progress for parent places if user is logged in
    let placesWithProgress = places;
    if (req.user && req.user._id) {
      const userVisits = await UserVisit.find({ user: req.user._id }).select('place');
      const visitedSet = new Set(userVisits.map(v => v.place.toString()));

      placesWithProgress = await Promise.all(places.map(async (place) => {
        const pObj = place.toObject();
        if (['country', 'state', 'city'].includes(pObj.category)) {
          let childFilter = { isActive: true, category: { $nin: ['country', 'state', 'city'] } };
          if (pObj.category === 'city') {
            childFilter.city = pObj.name;
          } else if (pObj.category === 'state') {
            childFilter.state = pObj.name;
          } else if (pObj.category === 'country') {
            childFilter.country = pObj.name;
          }

          const childPlaces = await Place.find(childFilter).select('_id');
          const totalSubPlaces = childPlaces.length;
          const visitedSubPlaces = childPlaces.filter(cp => visitedSet.has(cp._id.toString())).length;

          pObj.totalSubPlaces = totalSubPlaces;
          pObj.visitedSubPlaces = visitedSubPlaces;
          pObj.explorePercentage = totalSubPlaces > 0 ? Math.round((visitedSubPlaces / totalSubPlaces) * 100) : 0;
        }
        return pObj;
      }));
    }

    res.json({
      places: placesWithProgress,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get category summary with counts
// @route   GET /api/places/categories
export const getCategorySummary = async (req, res) => {
  try {
    const summary = await Place.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const result = {};
    summary.forEach((item) => {
      result[item._id] = item.count;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single place
// @route   GET /api/places/:id
export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create place (Admin)
// @route   POST /api/places
export const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update place (Admin)
// @route   PUT /api/places/:id
export const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete place (Admin)
// @route   DELETE /api/places/:id
export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get unique countries list
// @route   GET /api/places/countries
export const getCountriesList = async (req, res) => {
  try {
    const countries = await Place.distinct('country', {
      isActive: true,
      country: { $ne: '' },
    });
    res.json(countries.sort());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
