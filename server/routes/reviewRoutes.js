import express from 'express';
import {
  getBookReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all reviews for a book
router.route('/book/:id').get(getBookReviews);

// Create a new review (protected route)
router.route('/').post(protect, createReview);

// Update a review (protected route)
router.route('/:id').put(protect, updateReview);

// Delete a review (protected route)
router.route('/:id').delete(protect, deleteReview);

export default router;