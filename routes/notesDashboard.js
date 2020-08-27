const express = require('express');
const pool = require('../db/db');
const auth = require('../middleware/auth');
// const { Router } = require('express');

const router = new express.Router();

router.get('/', auth, async(req, res) => {
    
    try {
        
        // const user = await pool.query('SELECT name, email FROM users WHERE id = $1', [req.user]);
        const user = await pool.query('SELECT users.name, notesbook.notes_id, notesbook.title, notesbook.body, notesbook.edit_time FROM users LEFT JOIN notesbook on users.id = notesbook.user_id WHERE users.id = $1', [req.user]);
        res.json(user.rows)

    } catch (e) {
        res.status(500).json('Server Error')
    }
})

router.post('/make_note', auth, async(req, res) => {
    try {
        curTime = new Date().toLocaleString()
        const { title, body } = req.body;
        const newNote = await pool.query('INSERT INTO notesbook (user_id, title, body, edit_time) VALUES ($1, $2, $3, $4) RETURNING *', [req.user, title, body, curTime]);

        res.json(newNote.rows[0])

    } catch (e) {
        console.error(e.message)
        res.status(500).json('Server Error')
    }
})

router.patch('/:id', auth, async(req, res) => {
    try {
        curTime = new Date().toLocaleString()
        const result = await pool.query(
            'UPDATE notesbook SET title=$1, body=$2, edit_time=$4  WHERE notes_id=$3 RETURNING *',
            [req.body.title, req.body.body, req.params.id, curTime]
          );
        console.log(curTime)
          return res.json(result.rows);
    } catch (e) {
        console.error(e.message)
        res.status(500).json('Server Error')
    }
})

router.delete('/:id', auth, async(req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM notesbook WHERE notes_id=$1',
            [req.params.id]
          );
          return res.json(result.rows[0]);

    } catch (e) {
        console.error(e.message)
        res.status(500).json('Server Error')
    }
})

module.exports = router;