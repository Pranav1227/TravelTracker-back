import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  changeUserRole,
  awardBadge,
} from '../controller/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/users/:id/role', protect, adminOnly, changeUserRole);
router.post('/users/:id/badge', protect, adminOnly, awardBadge);

export default router;
