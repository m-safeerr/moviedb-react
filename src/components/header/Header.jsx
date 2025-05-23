import React, { useRef, useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';
import logo from '../../assets/tmovie.png';
import { useWishlist } from '../../contexts/WishlistContext';
import WishlistPopup from '../wishlist-popup/WishlistPopup';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'Series',
        path: '/tv'
    }
];

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const { wishlist } = useWishlist();
    const [showWishlistPopup, setShowWishlistPopup] = useState(false);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    const handleFavoritesClick = () => {
        setShowWishlistPopup(true);
    };

    const handleCloseWishlist = () => {
        setShowWishlistPopup(false);
    };

    return (
        <>
            <div ref={headerRef} className="header">
                <div className="header__wrap container">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/"><h4>Smdb</h4></Link>
                    </div>
                    <ul className="header__nav">
                        {
                            headerNav.map((e, i) => (
                                <li key={i} className={`${i === active ? 'active' : ''}`}>
                                    <Link to={e.path}>
                                        {e.display}
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="favorites-icon">
                            <button 
                                className="heart-icon-btn"
                                onClick={handleFavoritesClick}
                                aria-label="Favorites"
                            >
                                <svg 
                                    width="20" 
                                    height="20" 
                                    viewBox="0 0 24 24" 
                                    fill="#ffffff" 
                                    stroke="#ffffff" 
                                    strokeWidth="2"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                {wishlist.length > 0 && (
                                    <span className="wishlist-count">{wishlist.length}</span>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <WishlistPopup 
                isOpen={showWishlistPopup} 
                onClose={handleCloseWishlist} 
            />
        </>
    );
}

export default Header;