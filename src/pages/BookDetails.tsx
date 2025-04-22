import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookContext, { Book } from '../context/BookContext';
import ReviewList from '../components/review/ReviewList';
import { ArrowLeft, BookOpen } from 'lucide-react';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById } = useContext(BookContext);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        if (id) {
          const bookData = await getBookById(id);
          setBook(bookData);
        }
      } catch (err) {
        setError('Error fetching book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, getBookById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-blue-200 h-12 w-12 flex items-center justify-center mb-3">
            <BookOpen className="text-blue-800" />
          </div>
          <div className="h-4 bg-blue-200 rounded w-32 mb-2.5"></div>
          <div className="text-gray-500">Loading book details...</div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error || 'Book not found'}</p>
        <Link to="/" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <ArrowLeft size={16} className="mr-1" />
        Back to Books
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3 p-6 flex justify-center">
            <img
              src={book.coverImage || 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg'}
              alt={`Cover of ${book.title}`}
              className="w-full max-w-xs object-cover rounded-md shadow-md"
            />
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {book.genre}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {book.publishedYear}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                ISBN: {book.isbn}
              </span>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {book.description || 'No description available.'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-900">${book.price.toFixed(2)}</span>
              <button className="btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6 border-t border-gray-200">
          <ReviewList bookId={book._id} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;