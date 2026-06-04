import Badge from '../model/Badge.js';

// @desc    Get all badges
// @route   GET /api/badges
export const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find().sort({ level: 1, name: 1 });
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single badge
// @route   GET /api/badges/:id
export const getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    res.json(badge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new badge (Admin)
// @route   POST /api/badges
export const createBadge = async (req, res) => {
  try {
    const { name, description, icon, level, type, criteria } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'Name and description are required' });
    }

    const badge = await Badge.create({
      name,
      description,
      icon: icon || '🏆',
      level: level || 'bronze',
      type: type || 'special',
      criteria: criteria || '',
      createdBy: req.user._id,
    });

    res.status(201).json(badge);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'A badge with this name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update badge (Admin)
// @route   PUT /api/badges/:id
export const updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    res.json(badge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete badge (Admin)
// @route   DELETE /api/badges/:id
export const deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    res.json({ message: 'Badge deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
