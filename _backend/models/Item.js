const mongoose = require('mongoose'); // ZAMIAST import

const ItemSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Notatka musi mieć właściciela
    },

    type: {
        type: String,
        enum: ['notes', 'twitters', 'articles'],
        required: true,
    },
    
    title: { type: String, required: true },
    content: { type: String, required: true },
    articleUrl: { type: String },
    twitterName: { type: String },
    created: { type: String },
});

module.exports = mongoose.model('Item', ItemSchema);