const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const jwtSecret = require('./config/jwtToken');
const dbClient = require("./utils/database");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
dbClient.connect()

const staticUser = {
    username: 'rusha',
    password: 'shah@123'
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("req.body",req.body);
  
    // Check if credentials match the static user
    if (username === staticUser.username && password === staticUser.password) {
      // Generate JWT token
      const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
      console.log("token", token);

      // Return the token
      res.json({ token });

    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
