const express = require('express');
const app = express();
const db = require('./db'); // Update the path as per your file structure

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
// Get all tasks
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM Tasks')
    .then(result => {
      res.json(result.rows);
    })
    .catch(error => {
      console.error(error.stack);
      res.status(500).json({ error: error.message });
    });
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const { title, description, due_date } = req.body;
  db.query('INSERT INTO Tasks (title, description, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *', [title, description, due_date, 'pending'])
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(error => {
      console.error(error.stack);
      res.status(500).json({ error: error.message });
    });
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  db.query('UPDATE Tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 RETURNING *', [title, description, due_date, status, id])
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(error => {
      console.error(error.stack);
      res.status(500).json({ error: error.message });
    });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Tasks WHERE id = $1', [id])
    .then(() => {
      res.json({ message: 'Task deleted successfully' });
    })
    .catch(error => {
      console.error(error.stack);
      res.status(500).json({ error: error.message });
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
