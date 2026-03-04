
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} na ${req.url}`);
    next();
});

// Importujemy routery (zakładam, że są w folderze routes)
const userRoutes = require('./routes/user'); // Trasy logowania
const articleRouter = require('./routes/articleRouter');
const noteRouter = require('./routes/noteRouter');
const twitterRouter = require('./routes/twitterRouter');

// REJESTRACJA ROUTERÓW
// Dzięki temu React będzie uderzał w http://localhost:9000/api/articles itd.
app.use('/api/user', userRoutes);
app.use('/api/articles', articleRouter);
app.use('/api/notes', noteRouter);
app.use('/api/twitters', twitterRouter);

// Połączenie z bazą
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🍃 MongoDB Connected!'))
    .catch(err => console.error('Błąd połączenia:', err));

const PORT = process.env.PORT || 9000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server runs on port ${PORT}`));