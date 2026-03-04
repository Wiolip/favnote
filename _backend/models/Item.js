const mongoose = require('mongoose'); // ZAMIAST import

const ItemSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['notes', 'twitters', 'articles'],
        required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    articleUrl: { type: String },
    twitterName: { type: String },
    created: { type: String }, // Zmieniamy na String, bo Formik wysyła datę jako tekst
});

module.exports = mongoose.model('Item', ItemSchema); // ZAMIAST export default