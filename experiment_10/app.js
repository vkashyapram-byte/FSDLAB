const express = require('express');
const app = express();

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express.js Lab!' });
});

// Route with parameter
app.get('/students/:id', (req, res) => {
  res.json({ studentId: req.params.id, message: 'Student details fetched' });
});

// Route with query string
app.get('/search', (req, res) => {
  const { name, dept } = req.query;
  res.json({ search: { name, dept }, message: 'Search results' });
});

app.listen(3001, () => console.log('Express server running on port 3001'));
