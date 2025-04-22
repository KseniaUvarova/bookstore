import React from 'react';
import BookCard from './BookCard';
import { Book } from '../../context/BookContext';
import { BookOpen } from 'lucide-react';

interface BookListProps {
  books: Book[];
  title?: string;
  loading?: boolean;
  error?: string | null;
}

const BookList: React.FC<BookListProps> = ({ 
  books, 
  title, 
  loading = false, 
  error = null 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-blue-200 h-12 w-12 flex items-center justify-center mb-3">
            <BookOpen className="text-blue-800" />
          </div>
          <div className="h-4 bg-blue-200 rounded w-24 mb-2.5"></div>
          <div className="text-gray-500">Loading books...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-4">
        <p>{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">No books found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="page-transition">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;