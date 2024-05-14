// dao/userDetailsDao.js
const { connectToMongoDB } = require("../utils/db")
const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb

async function getAllUsers() {
    const db = await connectToMongoDB();
    const userCollection = db.collection('User_details');
    const deviceCollection = db.collection('Device_details');

    const users = await userCollection.find({}).toArray();

    const usersWithDeviceNames = await Promise.all(users.map(async user => {
        if (user.devices) {
            const devicesWithNames = await Promise.all(user.devices.map(async deviceId => {
                const device = await deviceCollection.findOne({ _id: new ObjectId(deviceId) });
                return { [deviceId]: device ? device.name || 'Device name not found' : 'Device not found' };
            }));
            const devicesObject = Object.assign({}, ...devicesWithNames);
            return { ...user, devices: devicesObject };
        } else {
            return { ...user, devices: {} }; // Or handle it as you see fit
        }
    }));
    console.log("usersWithDeviceNames", usersWithDeviceNames);
    return usersWithDeviceNames;
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
