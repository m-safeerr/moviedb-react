// backend/routes/wishlist.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Get all wishlist items for a user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId || 'guest';
        const wishlistItems = await Wishlist.find({ userId }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: wishlistItems,
            count: wishlistItems.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching wishlist',
            error: error.message
        });
    }
});

// Add item to wishlist
router.post('/', async (req, res) => {
    try {
        const {
            userId = 'guest',
            movieId,
            title,
            name,
            poster_path,
            backdrop_path,
            release_date,
            first_air_date,
            overview,
            vote_average,
            movieType
        } = req.body;

        // Check if item already exists in wishlist
        const existingItem = await Wishlist.findOne({ userId, movieId });
        if (existingItem) {
            return res.status(400).json({
                success: false,
                message: 'Item already in wishlist'
            });
        }

        const wishlistItem = new Wishlist({
            userId,
            movieId,
            title,
            name,
            poster_path,
            backdrop_path,
            release_date,
            first_air_date,
            overview,
            vote_average,
            movieType
        });

        const savedItem = await wishlistItem.save();
        
        res.status(201).json({
            success: true,
            message: 'Item added to wishlist',
            data: savedItem
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: 'Item already in wishlist'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error adding to wishlist',
                error: error.message
            });
        }
    }
});

// Remove item from wishlist
router.delete('/:userId/:movieId', async (req, res) => {
    try {
        const { userId, movieId } = req.params;
        
        const deletedItem = await Wishlist.findOneAndDelete({ 
            userId: userId || 'guest', 
            movieId: parseInt(movieId) 
        });

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in wishlist'
            });
        }

        res.json({
            success: true,
            message: 'Item removed from wishlist',
            data: deletedItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error removing from wishlist',
            error: error.message
        });
    }
});

// Check if item is in wishlist
router.get('/check/:userId/:movieId', async (req, res) => {
    try {
        const { userId, movieId } = req.params;
        
        const item = await Wishlist.findOne({ 
            userId: userId || 'guest', 
            movieId: parseInt(movieId) 
        });

        res.json({
            success: true,
            inWishlist: !!item,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking wishlist',
            error: error.message
        });
    }
});

// Clear entire wishlist for a user
router.delete('/clear/:userId', async (req, res) => {
    try {
        const userId = req.params.userId || 'guest';
        
        const result = await Wishlist.deleteMany({ userId });
        
        res.json({
            success: true,
            message: `Cleared ${result.deletedCount} items from wishlist`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error clearing wishlist',
            error: error.message
        });
    }
});

module.exports = router;