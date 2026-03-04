const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Pobieranie twitterów
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({ type: 'twitters' });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodawanie twittera
router.post('/', async (req, res) => {
    try {
        const newItem = new Item({
            ...req.body,
            type: 'twitters'
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Usuwanie twittera
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Twitter: Próba usunięcia ID:', id);

        const item = await Item.findOneAndDelete({
            $or: [{ _id: id }, { id: id }]
        });

        if (!item) {
            console.log('Twitter: Nie znaleziono elementu.');
            return res.status(404).json({ message: 'Nie znaleziono elementu' });
        }

        console.log('Twitter: Usunięto pomyślnie!');
        res.json({ message: 'Usunięto pomyślnie' });
    } catch (err) {
        console.error('Twitter: Błąd serwera:', err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;