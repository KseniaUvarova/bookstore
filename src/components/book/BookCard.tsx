import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../context/BookContext';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link to={`/books/${book._id}`} className="block">
      <div className="book-card bg-white rounded-lg shadow-md overflow-hidden h-full">
        <div className="h-48 overflow-hidden">
          <img
            src={book.coverImage || 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg'}
            alt={`Cover for ${book.title}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate" title={book.title}>
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-blue-900">${book.price.toFixed(2)}</span>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              {book.genre}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;