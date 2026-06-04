import express from 'express';
import {
  getPlaces,
  getCategorySummary,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getCountriesList,
} from '../controller/placeController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getPlaces);
router.get('/categories', protect, getCategorySummary);
router.get('/countries', protect, getCountriesList);
router.get('/:id', protect, getPlaceById);
router.post('/', protect, adminOnly, createPlace);
router.put('/:id', protect, adminOnly, updatePlace);
router.delete('/:id', protect, adminOnly, deletePlace);

export default router;
