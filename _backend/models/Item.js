const mongoose = require('mongoose'); // ZAMIAST import

const ItemSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, 
    },

    type: {
        type: String,
        enum: ['notes', 'twitters', 'articles'],
        required: false,
    },

    title: { type: String, required: true },
    content: { type: String, required: true },
    articleUrl: { type: String },
    twitterName: { type: String },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Item', ItemSchema);