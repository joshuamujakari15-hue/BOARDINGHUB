// --------------------
// IMPORTS
// --------------------
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// --------------------
// CREATE APP
// --------------------
const app = express();

// --------------------
// MIDDLEWARE
// --------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------
// ROUTES
// --------------------
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Optional: test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// --------------------
// START SERVER
// --------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
