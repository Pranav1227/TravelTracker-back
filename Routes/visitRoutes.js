import express from 'express';
import {
  getMyVisits,
  getExplorationStats,
  toggleVisit,
  getVisitedIds,
  addMemory,
} from '../controller/visitController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getMyVisits);
router.get('/stats', protect, getExplorationStats);
router.get('/ids', protect, getVisitedIds);
router.post('/toggle/:placeId', protect, toggleVisit);
router.post('/:placeId/memory', protect, upload.single('image'), addMemory);

export default router;
