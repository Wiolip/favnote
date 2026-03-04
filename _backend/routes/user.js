const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REJESTRACJA
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User created' });
    } catch (err) {
        res.status(400).send({ error: 'Username already exists' });
    }
});

// LOGOWANIE
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userID: user._id }, 'TWOJ_TAJNY_KLUCZ', { expiresIn: '1h' });
        res.send({ auth: true, token, userID: user._id });
    } else {
        res.status(401).send({ error: 'Invalid login or password' });
    }
});

module.exports = router;