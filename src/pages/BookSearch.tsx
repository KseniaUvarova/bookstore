import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookContext, { Book } from '../context/BookContext';
import BookList from '../components/book/BookList';
import SearchBar from '../components/ui/SearchBar';
import { Filter, X, BookOpen } from 'lucide-react';

const BookSearch: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getBooks, getBooksByTitle, getBooksByAuthor, getBookByIsbn } = useContext(BookContext);
  
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Extract search params
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const genre = searchParams.get('genre');
  
  // Handle search and filtering
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let results: Book[] = [];
        
        // Search by query string
        if (query) {
          // Try ISBN first (exact match)
          const bookByIsbn = await getBookByIsbn(query);
          
          if (bookByIsbn) {
            results = [bookByIsbn];
          } else {
            // Try title search
            const booksByTitle = await getBooksByTitle(query);
            
            if (booksByTitle.length > 0) {
              results = booksByTitle;
            } else {
              // Try author search
              const booksByAuthor = await getBooksByAuthor(query);
              results = booksByAuthor;
            }
          }
          
          setActiveFilter('search');
        } 
        // Filter by genre
        else if (genre) {
          const allBooks = await getBooks();
          results = allBooks.filter(book => 
            book.genre.toLowerCase() === genre.toLowerCase()
          );
          setActiveFilter('genre');
        } 
        // Default: show all books
        else {
          results = await getBooks();
          setActiveFilter(null);
        }
        
        setSearchResults(results);
      } catch (err) {
        setError('Error performing search');
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [query, genre, getBooks, getBooksByTitle, getBooksByAuthor, getBookByIsbn]);
  
  // Handle new search
  const handleSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };
  
  // Clear filters
  const clearFilters = () => {
    navigate('/search');
  };
  
  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">
          {query 
            ? `Search results for "${query}"` 
            : genre 
              ? `Books in ${genre}` 
              : 'All Books'}
        </h1>
        
        <SearchBar 
          initialQuery={query || ''}
          onSearch={handleSearch}
          placeholder="Search by title, author, or ISBN..."
        />
      </div>
      
      {/* Active Filters */}
      {activeFilter && (
        <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-md">
          <Filter size={18} className="text-gray-500 mr-2" />
          <div className="text-sm text-gray-700 mr-2">
            Active filter:
          </div>
          <div className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
            {activeFilter === 'search' 
              ? `Search: ${query}` 
              : `Genre: ${genre}`}
            <button 
              onClick={clearFilters}
              className="ml-1 text-blue-600 hover:text-blue-800"
              aria-label="Clear filter"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
      
      {/* Results */}
      <BookList 
        books={searchResults} 
        loading={loading}
        error={error}
      />
      
      {/* No Results */}
      {!loading && searchResults.length === 0 && !error && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No books found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
          <button 
            onClick={clearFilters}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            View all books
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSearch;