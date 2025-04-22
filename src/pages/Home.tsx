import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookContext from '../context/BookContext';
import BookList from '../components/book/BookList';
import SearchBar from '../components/ui/SearchBar';
import { BookOpen, Search } from 'lucide-react';

const Home: React.FC = () => {
  const { books, loading, error, getBooks } = useContext(BookContext);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    // Set featured books (random selection for this example)
    if (books.length > 0) {
      const shuffled = [...books].sort(() => 0.5 - Math.random());
      setFeaturedBooks(shuffled.slice(0, 4));
    }
  }, [books]);

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white rounded-xl overflow-hidden mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-95"></div>
        <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Favorite Book</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
            Explore our collection of books spanning various genres, authors, and themes.
          </p>
          
          <div className="w-full max-w-xl">
            <SearchBar placeholder="Search by title, author, or ISBN..." />
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Books</h2>
          <Link 
            to="/search" 
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span>View all</span>
            <span className="ml-1">→</span>
          </Link>
        </div>
        
        <BookList 
          books={featuredBooks}
          loading={loading}
          error={error}
        />
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Fiction', 'Fantasy', 'Romance', 'Mystery'].map((category) => (
            <Link
              key={category}
              to={`/search?genre=${category}`}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow"
            >
              <BookOpen size={32} className="text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-gray-50 rounded-xl p-8 mb-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About Our Bookstore</h2>
          <p className="text-gray-600 mb-4">
            Welcome to our online bookstore, where you can find a wide variety of books 
            from classic literature to contemporary bestsellers. Our platform offers an 
            intuitive search function, detailed book information, and a review system 
            to help you discover your next great read.
          </p>
          <p className="text-gray-600">
            Registered users can add reviews, track their favorite books, and more. 
            Start exploring our collection today!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;