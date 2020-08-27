const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/db');
const auth = require('../middleware/auth');
const generateAuthToken = require('../utils/jwtGenerator');
// const { Router } = require('express');

const router = new express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [
            email
        ]);
        // check out validate? and schmema
        if(user.rows.length !== 0) {
            
            return res.status(401).send("user already exists!")
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query
        ('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
         [name, email, bcryptPassword]);

        const token = await generateAuthToken(newUser.rows[0].id)
        
        res.json({ token })
    } catch (e) {
        // res.status(400).send(e)
        console.error(e.message)
        res.status(500).send('Server error')
    }
});

router.post('/login', async (req, res) => {
    try {
       const {email, password} = req.body

       const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
       if (user.rows.length === 0) {
           return res.status(401).json('Incorrect password or email')
       }

       const validPassword = await bcrypt.compare(password, user.rows[0].password);
       if(!validPassword){
           return res.status(401).json("Incorrect password or email")
       }

       const token = await generateAuthToken(user.rows[0].id)

       res.json({ token })
    
    }catch (e) {
        // res.status(400).send(e)
        console.error(e.message)
        res.status(500).send('Server error')
    }
});

router.get('/verified', auth, async (req, res) => {
    try {
        res.json(true)
    }catch (e) {
        // res.status(400).send(e)
        console.error(e.message)
        res.status(500).send('Server error')
    }
});
module.exports = router;