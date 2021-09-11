const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});
router.post('*', (req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});
router.put('*', (req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});
router.patch('*', (req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});
router.delete('*', (req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});
router.options('*', (req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});
router.head('*', (req, res) => {
    res.status(400).json({ error: 'Bad Request' });
});

module.exports = router;