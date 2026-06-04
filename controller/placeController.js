import Place from '../model/Place.js';

// @desc    Get all places (with optional filters)
// @route   GET /api/places
export const getPlaces = async (req, res) => {
  try {
    const { category, country, state, search, page = 1, limit = 50 } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (country) filter.country = country;
    if (state) filter.state = state;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Place.countDocuments(filter);
    const places = await Place.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      places,
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
