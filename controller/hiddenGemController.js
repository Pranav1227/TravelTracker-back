import HiddenGem from '../model/HiddenGem.js';
import Badge from '../model/Badge.js';
import User from '../model/User.js';

// @desc    Submit a hidden gem
// @route   POST /api/hidden-gems
export const submitHiddenGem = async (req, res) => {
  try {
    const { name, location, description, proofImageUrl } = req.body;

    if (!name || !location || !description) {
      return res
        .status(400)
        .json({ message: 'Name, location and description are required' });
    }

    const gem = await HiddenGem.create({
      submittedBy: req.user._id,
      name,
      location,
      description,
      proofImageUrl: proofImageUrl || '',
    });

    res.status(201).json(gem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's hidden gem submissions
// @route   GET /api/hidden-gems/my
export const getMyGems = async (req, res) => {
  try {
    const gems = await HiddenGem.find({ submittedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate('verifiedBy', 'name');

    res.json(gems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all hidden gems (Admin)
// @route   GET /api/hidden-gems
export const getAllGems = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const gems = await HiddenGem.find(filter)
      .sort({ createdAt: -1 })
      .populate('submittedBy', 'name email')
      .populate('verifiedBy', 'name');

    res.json(gems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify hidden gem (approve/reject) and optionally award badge
// @route   PUT /api/hidden-gems/:id/verify
export const verifyGem = async (req, res) => {
  try {
    const { status, adminNotes, badgeId } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res
        .status(400)
        .json({ message: 'Status must be approved or rejected' });
    }

    const gem = await HiddenGem.findById(req.params.id);
    if (!gem) {
      return res.status(404).json({ message: 'Hidden gem not found' });
    }

    gem.status = status;
    gem.verifiedBy = req.user._id;
    gem.adminNotes = adminNotes || '';
    gem.verifiedAt = new Date();
    await gem.save();

    // If approved and a badge is selected, award the badge to the user
    if (status === 'approved' && badgeId) {
      const badge = await Badge.findById(badgeId);
      if (badge) {
        const user = await User.findById(gem.submittedBy);
        // Avoid duplicate badge awards for the same gem
        const alreadyHas = user.badges.some(
          (b) => b.hiddenGem && b.hiddenGem.toString() === gem._id.toString()
        );
        if (!alreadyHas) {
          user.badges.push({
            badge: badge._id,
            awardedAt: new Date(),
            hiddenGem: gem._id,
          });
          await user.save();
        }
      }
    }

    await gem.populate('submittedBy', 'name email');
    await gem.populate('verifiedBy', 'name');

    res.json(gem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
