
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} na ${req.url}`);
    next();
});
app.use(express.json());

// Importujemy routery (zakładam, że są w folderze routes)
const articleRouter = require('./routes/articleRouter');
const noteRouter = require('./routes/noteRouter');
const twitterRouter = require('./routes/twitterRouter');

// Połączenie z bazą
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🍃 MongoDB Connected!'))
    .catch(err => console.error('Błąd połączenia:', err));

// REJESTRACJA ROUTERÓW
// Dzięki temu React będzie uderzał w http://localhost:9000/api/articles itd.
app.use('/api/articles', articleRouter);
app.use('/api/notes', noteRouter);
app.use('/api/twitters', twitterRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server runs on port ${PORT}`));