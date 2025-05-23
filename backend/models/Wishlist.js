// backend/models/Wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        default: 'guest' // For now, we'll use a default user. You can integrate with user authentication later
    },
    movieId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String // For TV series
    },
    poster_path: {
        type: String
    },
    backdrop_path: {
        type: String
    },
    release_date: {
        type: String
    },
    first_air_date: {
        type: String
    },
    overview: {
        type: String
    },
    vote_average: {
        type: Number
    },
    movieType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true
    }
}, {
    timestamps: true
});

// Create compound index to prevent duplicate entries
wishlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);