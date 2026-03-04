const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Pobieranie artykułów
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({ type: 'articles' });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodawanie artykułu
router.post('/', async (req, res) => {
    try {
        const newItem = new Item({
            ...req.body,
            type: 'articles'
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Usuwanie artykułu
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Article: Próba usunięcia ID:', id);

        const item = await Item.findOneAndDelete({
            $or: [{ _id: id }, { id: id }]
        });

        if (!item) {
            console.log('Article: Nie znaleziono elementu.');
            return res.status(404).json({ message: 'Nie znaleziono elementu' });
        }

        console.log('Article: Usunięto pomyślnie!');
        res.json({ message: 'Usunięto pomyślnie' });
    } catch (err) {
        console.error('Article: Błąd serwera:', err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;