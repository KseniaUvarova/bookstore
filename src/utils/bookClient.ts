import api from '../services/api';
import { Book } from '../context/BookContext';

// @desc   Get all books
// @method GET
export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get('/api/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching all books:', error);
    throw error;
  }
};

// @desc   Get book by ISBN (using promises)
// @method GET
export const getBookByIsbn = (isbn: string): Promise<Book> => {
  return new Promise((resolve, reject) => {
    api.get(`/api/books/isbn/${isbn}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error('Error fetching book by ISBN:', error);
        reject(error);
      });
  });
};

// @desc   Get books by author
// @method GET
export const getBooksByAuthor = async (author: string): Promise<Book[]> => {
  try {
    const response = await api.get(`/api/books/author/${author}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by author:', error);
    throw error;
  }
};

// @desc   Get books by title
// @method GET
export const getBooksByTitle = async (title: string): Promise<Book[]> => {
  try {
    const response = await api.get(`/api/books/title/${title}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by title:', error);
    throw error;
  }
};

export default {
  getAllBooks,
  getBookByIsbn,
  getBooksByAuthor,
  getBooksByTitle,
};