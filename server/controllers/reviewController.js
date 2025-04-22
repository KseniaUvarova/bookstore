import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import Book from '../models/Book.js';

// @desc    Get all reviews for a book
// @route   GET /api/reviews/book/:id
// @access  Public
const getBookReviews = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  
  // Check if book exists
  const bookExists = await Book.findById(bookId);
  if (!bookExists) {
    res.status(404);
    throw new Error('Book not found');
  }
  
  const reviews = await Review.find({ book: bookId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
    
  res.json(reviews);
});

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, bookId } = req.body;

  // Check if book exists
  const bookExists = await Book.findById(bookId);
  if (!bookExists) {
    res.status(404);
    throw new Error('Book not found');
  }

  // Check if user already reviewed the book
  const alreadyReviewed = await Review.findOne({
    user: req.user._id,
    book: bookId,
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this book');
  }

  const review = await Review.create({
    rating: Number(rating),
    comment,
    user: req.user._id,
    book: bookId,
  });

  if (review) {
    await review.populate('user', 'name');
    res.status(201).json(review);
  } else {
    res.status(400);
    throw new Error('Invalid review data');
  }
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Check if the review belongs to the user
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this review');
  }

  review.rating = Number(rating) || review.rating;
  review.comment = comment || review.comment;

  const updatedReview = await review.save();
  await updatedReview.populate('user', 'name');

  res.json(updatedReview);
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Check if the review belongs to the user
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this review');
  }

  await Review.deleteOne({ _id: req.params.id });
  res.json({ message: 'Review removed' });
});

export { getBookReviews, createReview, updateReview, deleteReview };