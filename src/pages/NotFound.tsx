import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookX } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="page-transition flex flex-col items-center justify-center py-12 text-center">
      <BookX size={80} className="text-blue-800 mb-6" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link 
        to="/"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;