import express from 'express';
import {
  getMyVisits,
  getExplorationStats,
  toggleVisit,
  getVisitedIds,
} from '../controller/visitController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getMyVisits);
router.get('/stats', protect, getExplorationStats);
router.get('/ids', protect, getVisitedIds);
router.post('/toggle/:placeId', protect, toggleVisit);

export default router;
