// src/components/wishlist-popup/WishlistPopup.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../contexts/WishlistContext';

import apiConfig from '../../api/apiConfig';
import './wishList.css';

const WishlistPopup = ({ isOpen, onClose }) => {
    const { wishlist, removeFromWishlist } = useWishlist();

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleRemove = (movieId, e) => {
        e.preventDefault();
        e.stopPropagation();
        removeFromWishlist(movieId);
    };

    return (
        <div className="wishlist-popup-overlay" onClick={handleBackdropClick}>
            <div className="wishlist-popup">
                <div className="wishlist-popup-header">
                    <h2>My Wishlist ({wishlist.length})</h2>
                    <button className="close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <div className="wishlist-content">
                    {wishlist.length === 0 ? (
                        <div className="empty-wishlist">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <p>Your wishlist is empty</p>
                            <span>Start adding movies you want to watch!</span>
                        </div>
                    ) : (
                        <div className="wishlist-grid">
                            {wishlist.map((movie) => {
                                const movieCategory = movie.movieType || (movie.title ? 'movie' : 'tv');
                                const link = '/' + movieCategory + '/' + movie.movieId;
                                const bg = apiConfig.w500Image(movie.poster_path || movie.backdrop_path);
                                
                                return (
                                    <div key={movie.movieId || movie._id} className="wishlist-item">
                                        <Link to={link} onClick={onClose}>
                                            <div className="wishlist-item-image" style={{backgroundImage: `url(${bg})`}}>
                                                <button 
                                                    className="remove-btn"
                                                    onClick={(e) => handleRemove(movie.movieId, e)}
                                                    aria-label="Remove from wishlist"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="wishlist-item-info">
                                                <h4>{movie.title || movie.name}</h4>
                                                <p>{movie.release_date || movie.first_air_date}</p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistPopup;