const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// ✅ ABSOLUTE PATH TO users.json
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

// 🔍 DEBUG: confirm file path
console.log('USERS FILE PATH:', USERS_FILE);

// 🔹 Read users
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

// 🔹 Save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ✅ SIGNUP (FORCE WRITE)
router.post('/signup', async (req, res) => {
  console.log('SIGNUP BODY:', req.body);

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Email exists' });
  }

const hashedPassword = await bcrypt.hash(password, 10);

users.push({
  id: Date.now(),
  name,
  email,
  password: hashedPassword,
  role
});


  users.push(newUser);
  saveUsers(users);

  console.log('USER SAVED:', newUser);

  res.json({ message: 'Signup successful' });
});

// ✅ LOGIN
const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const router = express.Router();
const usersFile = path.join(__dirname, '../data/users.json');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

  const user = users.find(
    u => u.email.toLowerCase().trim() === email.toLowerCase().trim()
  );

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

module.exports = router;
