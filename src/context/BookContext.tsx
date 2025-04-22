import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  description: string;
  price: number;
  coverImage: string;
}

interface BookContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  getBooks: () => Promise<void>;
  getBookById: (id: string) => Promise<Book | null>;
  getBookByIsbn: (isbn: string) => Promise<Book | null>;
  getBooksByAuthor: (author: string) => Promise<Book[]>;
  getBooksByTitle: (title: string) => Promise<Book[]>;
}

const BookContext = createContext<BookContextType>({
  books: [],
  loading: false,
  error: null,
  getBooks: async () => {},
  getBookById: async () => null,
  getBookByIsbn: async () => null,
  getBooksByAuthor: async () => [],
  getBooksByTitle: async () => [],
});

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBooks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.get('/api/books');
      setBooks(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
      setLoading(false);
      return [];
    }
  };

  const getBookById = async (id: string): Promise<Book | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.get(`/api/books/${id}`);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch book');
      setLoading(false);
      return null;
    }
  };

  const getBookByIsbn = async (isbn: string): Promise<Book | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.get(`/api/books/isbn/${isbn}`);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch book by ISBN');
      setLoading(false);
      return null;
    }
  };

  const getBooksByAuthor = async (author: string): Promise<Book[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.get(`/api/books/author/${author}`);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books by author');
      setLoading(false);
      return [];
    }
  };

  const getBooksByTitle = async (title: string): Promise<Book[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.get(`/api/books/title/${title}`);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books by title');
      setLoading(false);
      return [];
    }
  };

  // Load books on initial render
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        getBooks,
        getBookById,
        getBookByIsbn,
        getBooksByAuthor,
        getBooksByTitle,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;