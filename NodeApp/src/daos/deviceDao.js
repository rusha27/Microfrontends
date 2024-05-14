const { connectToMongoDB } = require("../utils/db")
const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb

async function getAllDevices() {
    const db = await connectToMongoDB();
    const collection = db.collection('Device_details');
    return collection.find({}).toArray();
}
async function getDeviceNameById(deviceId) {
    console.log("daoooooooooooooooooooooooooooo",deviceId);
    const db = await connectToMongoDB();
    const collection = db.collection('Device_details');
    return collection.findOne({ _id: new ObjectId(deviceId) });
}


async function deleteDeviceById(deviceId) {
    const db = await connectToMongoDB();
    const collection = db.collection('Device_details');
    console.log("deviceId",deviceId);
    return collection.deleteOne({ _id: new ObjectId(deviceId) });
}
async function addDevice(device) {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('Device_details');
        const result = await collection.insertOne(device);
        return result.insertedId;
    } catch (error) {
        console.error('Error adding device:', error);
        throw error;
    }
}
async function updateDeviceById(deviceId, updatedDeviceData) {
    const db = await connectToMongoDB();
    const collection = db.collection('Device_details');
    return collection.updateOne({ _id: new ObjectId(deviceId) }, { $set: updatedDeviceData });
}


module.exports = {
    getAllDevices, deleteDeviceById, addDevice, updateDeviceById, getDeviceNameById
};
