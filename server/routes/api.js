const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// ToDo lista lekérdezése
router.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.json(todos);
    })
    .catch(err => {
      console.error('Hiba történt a ToDo lista lekérdezésekor:', err);
      res.status(500).json({ error: 'Hiba történt a szerveren' });
    });
});

// Új ToDo létrehozása
router.post('/todos', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title
  });

  newTodo.save()
    .then(todo => {
      res.json(todo);
    })
    .catch(err => {
      console.error('Hiba történt az új ToDo létrehozásakor:', err);
      res.status(500).json({ error: 'Hiba történt a szerveren' });
    });
});

// Új ToDo frissítése
router.put('/todos/:id', (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedTodo => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'A ToDo nem található' });
      }
      res.json(updatedTodo);
    })
    .catch(err => {
      console.error('Hiba történt a ToDo frissítésekor:', err);
      res.status(500).json({ error: 'Hiba történt a szerveren' });
    });
});


// ToDo törlése
router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then(deletedTodo => {
      if (!deletedTodo) {
        return res.status(404).json({ error: 'A ToDo nem található' });
      }
      res.json({ message: 'A ToDo sikeresen törölve lett' });
    })
    .catch(err => {
      console.error('Hiba történt a ToDo törlésekor:', err);
      res.status(500).json({ error: 'Hiba történt a szerveren' });
    });
});


module.exports = router;
