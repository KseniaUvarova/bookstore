import React, { useContext, useState } from 'react';
import { Star, Edit2, Trash2 } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import { Review } from '../../services/reviewService';
import ReviewForm from './ReviewForm';

interface ReviewItemProps {
  review: Review;
  onUpdate: (reviewId: string, rating: number, comment: string) => Promise<void>;
  onDelete: (reviewId: string) => Promise<void>;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onUpdate, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  
  // Format date
  const formattedDate = new Date(review.createdAt).toLocaleDateString();
  
  // Check if review belongs to current user
  const isOwner = user && user._id === review.user._id;
  
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isEditing) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <ReviewForm
          initialRating={review.rating}
          initialComment={review.comment}
          onSubmit={async (rating, comment) => {
            await onUpdate(review._id, rating, comment);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="font-semibold">{review.user.name}</div>
          <div className="text-gray-500 text-sm ml-2">• {formattedDate}</div>
        </div>
        
        {isOwner && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
              aria-label="Edit review"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(review._id)}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete review"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex mb-2">{renderStars()}</div>
      
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;