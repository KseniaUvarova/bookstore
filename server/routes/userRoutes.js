import express from 'express';
import {
  registerUser,
  authUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.route('/').post(registerUser);

// Login user
router.route('/login').post(authUser);

// Get user profile (protected route)
router.route('/profile').get(protect, getUserProfile);

export default router;