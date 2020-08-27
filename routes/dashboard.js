const express = require('express');
const pool = require('../db/db');
const auth = require('../middleware/auth');
// const { Router } = require('express');

const router = new express.Router();

router.get('/', auth, async(req, res) => {
    try {
        
        const user = await pool.query('SELECT name, email FROM users WHERE id = $1', [req.user]);

        res.json(user.rows[0])

    } catch (e) {
        res.status(500).json('Server Error')
    }
})

module.exports = router;