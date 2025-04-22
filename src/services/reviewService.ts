import api from './api';

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  book: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

// Get all reviews for a book
export const getBookReviews = async (bookId: string): Promise<Review[]> => {
  try {
    const { data } = await api.get(`/api/reviews/book/${bookId}`);
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

// Add a new review
export const createReview = async (
  bookId: string,
  rating: number,
  comment: string
): Promise<Review | null> => {
  try {
    const { data } = await api.post('/api/reviews', {
      bookId,
      rating,
      comment,
    });
    return data;
  } catch (error) {
    console.error('Error creating review:', error);
    return null;
  }
};

// Update a review
export const updateReview = async (
  reviewId: string,
  rating: number,
  comment: string
): Promise<Review | null> => {
  try {
    const { data } = await api.put(`/api/reviews/${reviewId}`, {
      rating,
      comment,
    });
    return data;
  } catch (error) {
    console.error('Error updating review:', error);
    return null;
  }
};

// Delete a review
export const deleteReview = async (reviewId: string): Promise<boolean> => {
  try {
    await api.delete(`/api/reviews/${reviewId}`);
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
};

export default {
  getBookReviews,
  createReview,
  updateReview,
  deleteReview,
};