import React from 'react';
import './movie-card.scss';
import { Link } from 'react-router-dom';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useWishlist } from '../../contexts/WishlistContext';

const MovieCard = props => {
    const item = props.item;
    const { isInWishlist, toggleWishlist } = useWishlist();
    
    const link = '/' + category[props.category] + '/' + item.id;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    const isFavorite = isInWishlist(item.id);
    
    // Get rating from TMDB API data
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

    const handleHeartClick = async (e) => {
        e.preventDefault(); // Prevent navigation when clicking heart
        e.stopPropagation();
        
        const success = await toggleWishlist(item);
        
        if (!success) {
            // Handle error - maybe show a toast notification
            console.error('Failed to update wishlist');
        }
        
        // Optional: Call a prop function to handle additional logic
        if (props.onFavoriteToggle) {
            props.onFavoriteToggle(item.id, !isFavorite);
        }
    };

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <button 
                    className={`heart-btn ${isFavorite ? 'favorite' : ''}`}
                    onClick={handleHeartClick}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill={isFavorite ? '#ff0000' : 'none'} 
                        stroke={isFavorite ? '#ff0000' : '#ffffff'} 
                        strokeWidth="2"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
                
                {/* Rating badge */}
                <div className="rating-badge">
                    <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="#ffd700" 
                        stroke="#ffd700" 
                        strokeWidth="1"
                    >
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                    <span>{rating}</span>
                </div>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;