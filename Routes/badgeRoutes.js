import express from 'express';
import {
  getAllBadges,
  getBadgeById,
  createBadge,
  updateBadge,
  deleteBadge,
} from '../controller/badgeController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllBadges);
router.get('/:id', protect, getBadgeById);
router.post('/', protect, adminOnly, createBadge);
router.put('/:id', protect, adminOnly, updateBadge);
router.delete('/:id', protect, adminOnly, deleteBadge);

export default router;
