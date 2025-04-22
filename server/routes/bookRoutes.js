import express from 'express';
import {
  getBooks,
  getBookById,
  getBookByIsbn,
  getBooksByAuthor,
  getBooksByTitle,
  createBook,
} from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all books
router.route('/').get(getBooks);

// Get book by ID
router.route('/:id').get(getBookById);

// Get book by ISBN
router.route('/isbn/:isbn').get(getBookByIsbn);

// Get books by author
router.route('/author/:author').get(getBooksByAuthor);

// Get books by title
router.route('/title/:title').get(getBooksByTitle);

// Create a new book (protected route)
router.route('/').post(protect, createBook);

export default router;