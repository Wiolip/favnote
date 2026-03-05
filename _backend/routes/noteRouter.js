const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Pobieranie artykułów
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({});
        console.log("Co znalazłem w bazie:", items);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodawanie artykułu
router.post('/', async (req, res) => {
    try {
        const itemData = {
            ...req.body,
            type: 'notes'
        };

        if (!itemData.userID || itemData.userID === "TWOJE_ID_Z_MONGO_ATLAS") {
            delete itemData.userID;
        }

        const newItem = new Item(itemData);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// noteRouter.js
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Próba usunięcia elementu o ID:', id);

        // Szukamy po _id (standard Mongo) LUB po id (jeśli tak zapisałaś w bazie)
        const item = await Item.findOneAndDelete({
            $or: [{ _id: id }, { id: id }]
        });

        if (!item) {
            console.log('Nie znaleziono elementu w bazie danych.');
            return res.status(404).json({ message: 'Nie znaleziono elementu' });
        }

        console.log('Usunięto pomyślnie!');
        res.json({ message: 'Usunięto pomyślnie' });
    } catch (err) {
        console.error('Błąd serwera:', err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;