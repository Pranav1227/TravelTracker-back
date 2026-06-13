import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getBucketLists,
  getBucketListById,
  createBucketList,
  updateBucketList,
  deleteBucketList,
  toggleFavorite,
  togglePlaceVisited,
  duplicateBucketList,
} from '../controller/bucketListController.js';

const router = express.Router();

// Get and Create
router.route('/').get(protect, getBucketLists).post(protect, createBucketList);

// Specific Bucket List operations
router
  .route('/:id')
  .get(protect, getBucketListById)
  .put(protect, updateBucketList)
  .delete(protect, deleteBucketList);

router.put('/:id/favorite', protect, toggleFavorite);
router.post('/:id/duplicate', protect, duplicateBucketList);

// Place specific operations inside bucket list
router.put('/:id/places/:placeId/visited', protect, togglePlaceVisited);

export default router;
