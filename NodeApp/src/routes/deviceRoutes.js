const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.get('/devices', deviceController.getAllDevices);

router.get('/devicesname/:id', deviceController.getAllDevicesName);

router.delete('/deletedevice/:id', deviceController.deleteDevice);
router.post('/adddevice', deviceController.addDevice);
router.put('/editdevice/:deviceId', deviceController.updateDevice);

module.exports = router;
