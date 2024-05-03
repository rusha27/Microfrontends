// const { MongoClient } = require('mongodb');
// const { connectToMongoDB, closeMongoDBConnection } = require('../utils/db');

// async function getUser(username) {
//     try {
//         console.log("username", username);
//         await connectToMongoDB();
//         const db = client.db();
//         const collection = db.collection('Login');
//         return await collection.findOne({ username , password });
//     } finally {
//         await closeMongoDBConnection();
//     }
// }

// module.exports = {
//     getUser
// };
