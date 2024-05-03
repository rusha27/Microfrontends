const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/SingleSPA';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function closeMongoDBConnection() {
    await client.close();
}

module.exports = {
    connectToMongoDB,
    closeMongoDBConnection
};
