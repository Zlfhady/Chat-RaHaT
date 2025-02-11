const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    res.json({ message: "Signup successful" });
});

router.post('/login', (req, res) => {
    res.json({ message: "Login successful" });
});

module.exports = router;
