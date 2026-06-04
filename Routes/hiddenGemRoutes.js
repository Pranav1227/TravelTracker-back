import express from 'express';
import {
  submitHiddenGem,
  getMyGems,
  getAllGems,
  verifyGem,
} from '../controller/hiddenGemController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, submitHiddenGem);
router.get('/my', protect, getMyGems);
router.get('/', protect, adminOnly, getAllGems);
router.put('/:id/verify', protect, adminOnly, verifyGem);

export default router;
