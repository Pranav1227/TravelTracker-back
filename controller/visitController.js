import UserVisit from '../model/UserVisit.js';
import Place from '../model/Place.js';

// @desc    Get all visits for current user
// @route   GET /api/visits
export const getMyVisits = async (req, res) => {
  try {
    const { category } = req.query;
    const visits = await UserVisit.find({ user: req.user._id }).populate(
      'place'
    );

    let filtered = visits;
    if (category) {
      filtered = visits.filter(
        (v) => v.place && v.place.category === category
      );
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get exploration stats for current user
// @route   GET /api/visits/stats
export const getExplorationStats = async (req, res) => {
  try {
    const categories = ['country', 'state', 'city', 'wonder', 'fort', 'landmark'];

    // Get total places per category
    const totalsByCategory = await Place.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    const totals = {};
    totalsByCategory.forEach((t) => {
      totals[t._id] = t.count;
    });

    // Get user's visited place IDs
    const visits = await UserVisit.find({ user: req.user._id }).populate(
      'place',
      'category'
    );

    const visitedByCategory = {};
    categories.forEach((c) => {
      visitedByCategory[c] = 0;
    });

    visits.forEach((v) => {
      if (v.place && v.place.category) {
        visitedByCategory[v.place.category] =
          (visitedByCategory[v.place.category] || 0) + 1;
      }
    });

    // Build stats
    const stats = {};
    let totalVisited = 0;
    let totalPlaces = 0;

    categories.forEach((cat) => {
      const visited = visitedByCategory[cat] || 0;
      const total = totals[cat] || 0;
      stats[cat] = {
        visited,
        total,
        percentage: total > 0 ? Math.round((visited / total) * 10000) / 100 : 0,
      };
      totalVisited += visited;
      totalPlaces += total;
    });

    stats.overall = {
      visited: totalVisited,
      total: totalPlaces,
      percentage:
        totalPlaces > 0
          ? Math.round((totalVisited / totalPlaces) * 10000) / 100
          : 0,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle a visit (check/uncheck place)
// @route   POST /api/visits/toggle/:placeId
export const toggleVisit = async (req, res) => {
  try {
    const { placeId } = req.params;

    // Check if place exists
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Check if already visited
    const existingVisit = await UserVisit.findOne({
      user: req.user._id,
      place: placeId,
    });

    if (existingVisit) {
      // Uncheck – remove visit
      await UserVisit.findByIdAndDelete(existingVisit._id);

      // Fetch all remaining visits to perform cascade cleanups
      const remainingVisits = await UserVisit.find({ user: req.user._id }).populate('place');

      // 1. City cleanup: if we unvisited an attraction inside a city, and there are no other attractions left visited in this city
      if (place.city && place.category !== 'city') {
        const hasOtherInCity = remainingVisits.some(
          v => v.place && v.place.city === place.city && v.place.category !== 'city'
        );
        if (!hasOtherInCity) {
          const cityPlace = await Place.findOne({ category: 'city', name: place.city });
          if (cityPlace) {
            await UserVisit.findOneAndDelete({ user: req.user._id, place: cityPlace._id });
          }
        }
      }

      // 2. State cleanup: if we unvisited an attraction/city inside a state, and there are no other entries left visited in this state
      if (place.state && place.category !== 'state') {
        const hasOtherInState = remainingVisits.some(
          v => v.place && v.place.state === place.state && v.place.category !== 'state'
        );
        if (!hasOtherInState) {
          const statePlace = await Place.findOne({ category: 'state', name: place.state });
          if (statePlace) {
            await UserVisit.findOneAndDelete({ user: req.user._id, place: statePlace._id });
          }
        }
      }

      // 3. Country cleanup: if we unvisited an entry inside a country, and there are no other entries left visited in this country
      if (place.country && place.category !== 'country') {
        const hasOtherInCountry = remainingVisits.some(
          v => v.place && v.place.country === place.country && v.place.category !== 'country'
        );
        if (!hasOtherInCountry) {
          const countryPlace = await Place.findOne({ category: 'country', name: place.country });
          if (countryPlace) {
            await UserVisit.findOneAndDelete({ user: req.user._id, place: countryPlace._id });
          }
        }
      }

      return res.json({ visited: false, message: 'Visit removed' });
    } else {
      // Check – add visit
      const visit = await UserVisit.create({
        user: req.user._id,
        place: placeId,
        notes: req.body.notes || '',
      });

      // AUTOMATIC CASCADE CHECKS:
      // 1. City cascade: if this is a wonder/fort/landmark located inside a city, automatically mark that city as visited
      if (place.city && place.category !== 'city') {
        const cityPlace = await Place.findOne({ category: 'city', name: place.city, isActive: true });
        if (cityPlace) {
          const cityVisited = await UserVisit.findOne({ user: req.user._id, place: cityPlace._id });
          if (!cityVisited) {
            await UserVisit.create({ user: req.user._id, place: cityPlace._id, notes: 'Visited automatically via attraction' });
          }
        }
      }

      // 2. State cascade: if this place lies in a state, automatically mark that state as visited
      if (place.state && place.category !== 'state') {
        const statePlace = await Place.findOne({ category: 'state', name: place.state, isActive: true });
        if (statePlace) {
          const stateVisited = await UserVisit.findOne({ user: req.user._id, place: statePlace._id });
          if (!stateVisited) {
            await UserVisit.create({ user: req.user._id, place: statePlace._id, notes: 'Visited automatically via attraction' });
          }
        }
      }

      // 3. Country cascade: if this place lies in a country, automatically mark that country as visited
      if (place.country && place.category !== 'country') {
        const countryPlace = await Place.findOne({ category: 'country', name: place.country, isActive: true });
        if (countryPlace) {
          const countryVisited = await UserVisit.findOne({ user: req.user._id, place: countryPlace._id });
          if (!countryVisited) {
            await UserVisit.create({ user: req.user._id, place: countryPlace._id, notes: 'Visited automatically via attraction' });
          }
        }
      }

      return res.json({ visited: true, visit, message: 'Visit recorded' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get visited place IDs for current user (lightweight)
// @route   GET /api/visits/ids
export const getVisitedIds = async (req, res) => {
  try {
    const visits = await UserVisit.find({ user: req.user._id }).select(
      'place'
    );
    const ids = visits.map((v) => v.place.toString());
    res.json(ids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
