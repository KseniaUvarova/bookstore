import React, { useState, useEffect, useContext } from 'react';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import { getBookReviews, createReview, updateReview, deleteReview, Review } from '../../services/reviewService';
import AuthContext from '../../context/AuthContext';
import { MessageSquare } from 'lucide-react';

interface ReviewListProps {
  bookId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ bookId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);

  // Check if user has already reviewed this book
  const hasReviewed = user && reviews.some(review => review.user._id === user._id);

  // Load reviews
  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const data = await getBookReviews(bookId);
        setReviews(data);
        setError(null);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [bookId]);

  // Add a new review
  const handleAddReview = async (rating: number, comment: string) => {
    if (!user) return;
    
    try {
      const newReview = await createReview(bookId, rating, comment);
      if (newReview) {
        setReviews([newReview, ...reviews]);
      }
    } catch (err) {
      setError('Failed to add review');
    }
  };

  // Update a review
  const handleUpdateReview = async (reviewId: string, rating: number, comment: string) => {
    try {
      const updatedReview = await updateReview(reviewId, rating, comment);
      if (updatedReview) {
        setReviews(
          reviews.map(review => 
            review._id === reviewId ? updatedReview : review
          )
        );
      }
    } catch (err) {
      setError('Failed to update review');
    }
  };

  // Delete a review
  const handleDeleteReview = async (reviewId: string) => {
    try {
      const success = await deleteReview(reviewId);
      if (success) {
        setReviews(reviews.filter(review => review._id !== reviewId));
      }
    } catch (err) {
      setError('Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 mt-8">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-6">
        Reviews {reviews.length > 0 && `(${reviews.length})`}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {user && !hasReviewed && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Write a Review</h3>
          <ReviewForm onSubmit={handleAddReview} />
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewItem
              key={review._id}
              review={review}
              onUpdate={handleUpdateReview}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">No reviews yet</h3>
          <p className="text-gray-500 mt-1">Be the first to share your thoughts</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;