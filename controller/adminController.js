import User from '../model/User.js';
import Place from '../model/Place.js';
import UserVisit from '../model/UserVisit.js';
import HiddenGem from '../model/HiddenGem.js';
import Badge from '../model/Badge.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalPlaces, totalVisits, pendingGems, totalBadges] =
      await Promise.all([
        User.countDocuments(),
        Place.countDocuments({ isActive: true }),
        UserVisit.countDocuments(),
        HiddenGem.countDocuments({ status: 'pending' }),
        Badge.countDocuments(),
      ]);

    // Top explorers – users with most visits
    const topExplorers = await UserVisit.aggregate([
      { $group: { _id: '$user', visitCount: { $sum: 1 } } },
      { $sort: { visitCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: '$user._id',
          name: '$user.name',
          email: '$user.email',
          visitCount: 1,
        },
      },
    ]);

    res.json({
      totalUsers,
      totalPlaces,
      totalVisits,
      pendingGems,
      totalBadges,
      topExplorers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('badges.badge')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change user role
// @route   PUT /api/admin/users/:id/role
export const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Award badge to a user manually
// @route   POST /api/admin/users/:id/badge
export const awardBadge = async (req, res) => {
  try {
    const { badgeId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const badge = await Badge.findById(badgeId);
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    // Check if user already has this badge (without a hiddenGem context)
    const alreadyHas = user.badges.some(
      (b) => b.badge.toString() === badgeId && !b.hiddenGem
    );
    if (alreadyHas) {
      return res.status(400).json({ message: 'User already has this badge' });
    }

    user.badges.push({ badge: badge._id, awardedAt: new Date() });
    await user.save();
    await user.populate('badges.badge');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
