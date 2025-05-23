// src/contexts/WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // API base URL - adjust this to match your backend
    const API_BASE_URL = 'http://localhost:5000/api';
    const USER_ID = 'guest'; // For now using guest, replace with actual user ID when you have auth

    // Fetch wishlist from backend
    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/wishlist/${USER_ID}`);
            const data = await response.json();
            
            if (data.success) {
                setWishlist(data.data);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add movie to wishlist
    const addToWishlist = async (movie) => {
        try {
            const wishlistItem = {
                userId: USER_ID,
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
                body: JSON.stringify(wishlistItem),
            });

            const data = await response.json();
            
            if (data.success) {
                setWishlist(prev => [data.data, ...prev]);
                return true;
            } else {
                console.error('Error adding to wishlist:', data.message);
                return false;
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            return false;
        }
    };

    // Remove movie from wishlist
    const removeFromWishlist = async (movieId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/${USER_ID}/${movieId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            
            if (data.success) {
                setWishlist(prev => prev.filter(item => item.movieId !== movieId));
                return true;
            } else {
                console.error('Error removing from wishlist:', data.message);
                return false;
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return false;
        }
    };

    // Check if movie is in wishlist
    const isInWishlist = (movieId) => {
        return wishlist.some(item => item.movieId === movieId);
    };



    // Toggle wishlist status
    const toggleWishlist = async (movie) => {
        const movieId = movie.id;
        
        if (isInWishlist(movieId)) {
            return await removeFromWishlist(movieId);
        } else {
            return await addToWishlist(movie);
        }
    };


    // Load wishlist on component mount
    useEffect(() => {
        fetchWishlist();
    }, []);

    const value = {
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        fetchWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};