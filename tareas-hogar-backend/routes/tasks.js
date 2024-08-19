const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Crear tarea
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and description are required');
    }
    connection.query(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ id: results.insertId, title, description, status: 'pending' });
        }
    );
});

// Leer todas las tareas
router.get('/', (req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    connection.query('SELECT * FROM tasks LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// Actualizar tarea
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).send('Title, and status are required');
    }

    connection.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Task not found');

        connection.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description, status, id],
            (err, results) => {
                if (err) return res.status(500).send(err);
                res.status(200).send({ id, title, description, status });
            }
        );
    });
});

// Eliminar tarea
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Task not found');

        connection.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(204).send();
        });
    });
});

module.exports = router;