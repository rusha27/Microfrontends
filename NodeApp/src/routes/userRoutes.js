// routes/userDetailsRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.delete('/deleteuser/:id', userController.deleteUser);
router.post('/adduser', userController.addUser);
router.put('/edituser/:userId', userController.updateUser);

module.exports = router;
