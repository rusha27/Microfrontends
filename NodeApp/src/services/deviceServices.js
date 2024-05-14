// services/deviceDetailsService.js
const deviceDao = require('../daos/deviceDao');

async function getDevices() {
    return deviceDao.getAllDevices();
}
async function getDevicesName(deviceId) {
    console.log("deviceId---------",deviceId);
    return deviceDao.getDeviceNameById(deviceId);
}
async function deleteDevice(deviceId) {
    return deviceDao.deleteDeviceById(deviceId);
}
async function addDevice(device) {
    try {
        const deviceId = await deviceDao.addDevice(device);
        return deviceId;
    } catch (error) {
        console.error('Error adding device:', error);
        throw error;
    }
}

module.exports = {
    getDevices, deleteDevice, addDevice, getDevicesName
};
