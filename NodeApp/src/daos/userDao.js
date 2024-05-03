// dao/userDetailsDao.js
const { connectToMongoDB } = require("../utils/db")
const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb


async function getAllUsers() {
    const db = await connectToMongoDB();
    const collection = db.collection('User_details');
    return collection.find({}).toArray();
}
async function deleteUserById(userId) {
    const db = await connectToMongoDB();
    const collection = db.collection('User_details');
    console.log("userId",userId);
    return collection.deleteOne({ _id: new ObjectId(userId) });
}
async function addUser(user) {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('User_details');
        const result = await collection.insertOne(user);
        return result.insertedId;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}
async function updateUserById(userId, updatedUserData) {
    const db = await connectToMongoDB();
    const collection = db.collection('User_details');
    return collection.updateOne({ _id: new ObjectId(userId) }, { $set: updatedUserData });
}


module.exports = {
    getAllUsers, deleteUserById, addUser, updateUserById
};
