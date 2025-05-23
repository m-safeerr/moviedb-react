// src/services/wishlistApi.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class WishlistAPI {
    // Get all wishlist items
    static async getWishlist(userId = 'guest') {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/${userId}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch wishlist');
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            throw error;
        }
    }

    // Add item to wishlist
    static async addToWishlist(movie, userId = 'guest') {
        try {
            const movieData = {
                userId,
                movieId: movie.id,
                title: movie.title,
                name: movie.name,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                release_date: movie.release_date,
                first_air_date: movie.first_air_date,
                overview: movie.overview,
                vote_average: movie.vote_average,
                movieType: movie.title ? 'movie' : 'tv'
            };

            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to wishlist');
            }
            
            return data;
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            throw error;
        }
    }

    // Remove item from wishlist
    static async removeFromWishlist(movieId, userId = 'guest') {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/${userId}/${movieId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to remove from wishlist');
            }
            
            return data;
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            throw error;
        }
    }

    // Check if item is in wishlist
    static async checkInWishlist(movieId, userId = 'guest') {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/check/${userId}/${movieId}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to check wishlist');
            }
            
            return data;
        } catch (error) {
            console.error('Error checking wishlist:', error);
            throw error;
        }
    }

    // Clear entire wishlist
    static async clearWishlist(userId = 'guest') {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/clear/${userId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to clear wishlist');
            }
            
            return data;
        } catch (error) {
            console.error('Error clearing wishlist:', error);
            throw error;
        }
    }
}

export default WishlistAPI;