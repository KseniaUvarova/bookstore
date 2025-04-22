import asyncHandler from 'express-async-handler';
import Book from '../models/Book.js';

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Get book by ISBN
// @route   GET /api/books/isbn/:isbn
// @access  Public
const getBookByIsbn = asyncHandler(async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Get books by author
// @route   GET /api/books/author/:author
// @access  Public
const getBooksByAuthor = asyncHandler(async (req, res) => {
  const author = req.params.author;
  const books = await Book.find({ author: { $regex: author, $options: 'i' } });
  
  if (books.length > 0) {
    res.json(books);
  } else {
    res.status(404);
    throw new Error('No books found for this author');
  }
});

// @desc    Get books by title
// @route   GET /api/books/title/:title
// @access  Public
const getBooksByTitle = asyncHandler(async (req, res) => {
  const title = req.params.title;
  const books = await Book.find({ title: { $regex: title, $options: 'i' } });
  
  if (books.length > 0) {
    res.json(books);
  } else {
    res.status(404);
    throw new Error('No books found with this title');
  }
});

// @desc    Create a book (Admin only)
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const { 
    title, 
    author, 
    isbn, 
    publishedYear, 
    genre, 
    description, 
    price, 
    coverImage 
  } = req.body;

  const bookExists = await Book.findOne({ isbn });

  if (bookExists) {
    res.status(400);
    throw new Error('Book with this ISBN already exists');
  }

  const book = await Book.create({
    title,
    author,
    isbn,
    publishedYear,
    genre,
    description,
    price,
    coverImage,
  });

  if (book) {
    res.status(201).json(book);
  } else {
    res.status(400);
    throw new Error('Invalid book data');
  }
});

export {
  getBooks,
  getBookById,
  getBookByIsbn,
  getBooksByAuthor,
  getBooksByTitle,
  createBook,
};