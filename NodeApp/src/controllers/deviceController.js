// controllers/deviceDetailsController.js
const deviceService = require('../services/deviceServices');
const {updateDeviceById} =require('../daos/deviceDao')

async function getAllDevices(req, res) {
    console.log("-----------------------------");
    try {
        console.log("000000000000000000000000000000000");
        const devices = await deviceService.getDevices();
        res.json(devices);
    } catch (error) {
        console.error('Error fetching devices:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getAllDevicesName(req, res) {
    const deviceId = req.params.id;
    console.log("controller0000000000000000000",deviceId);
    try {
        const device = await deviceService.getDevicesName(deviceId);
        res.json(device);
    } catch (error) {
        console.error('Error fetching device:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function deleteDevice(req, res) {
    console.log("8888888888888888888888888");
    const deviceId = req.params.id;
    console.log("deviceId",deviceId);
    try {
        const result = await deviceService.deleteDevice(deviceId);
        if (result.deletedCount === 1) {
            res.json({ message: 'Device deleted successfully' });
        } else {
            res.status(404).json({ message: 'Device not found' });
        }
    } catch (error) {
        console.error('Error deleting device:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function addDevice(req, res) {
    try {
        const deviceId = await deviceService.addDevice(req.body);
        res.status(201).json({ deviceId });
    } catch (error) {
        console.error('Error adding device:', error);
        res.status(500).json({ message: 'Failed to add device' });
    }
}

async function updateDevice(req, res) {
    const { deviceId } = req.params;
    const { name, contact, address } = req.body;
    const updatedDeviceData = { name, contact, address };

    try {
        await updateDeviceById(deviceId, updatedDeviceData);
        res.status(200).json({ message: 'Device updated successfully' });
    } catch (error) {
        console.error('Error updating device:', error);
        res.status(500).json({ message: 'Failed to update device' });
    }
}

module.exports = {
    getAllDevices, deleteDevice, addDevice, updateDevice, getAllDevicesName
};
