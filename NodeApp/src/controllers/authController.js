const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtToken');
const { connectToMongoDB, closeMongoDBConnection} = require("../utils/db")

async function login(req, res) {
    const { username, password } = req.body;
    console.log("req.body", req.body);

    let db;
    try {
        db = await connectToMongoDB();
        
        const collection = db.collection('Login');
        
        const user = await collection.findOne({ username });
        console.log("user..............................",user);

        if (user && user.password === password) {
            console.log("user", user);
            const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
            console.log("token", token);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (db) await closeMongoDBConnection();
    }
}

module.exports = {
    login
};
