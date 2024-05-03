// controllers/userDetailsController.js
const userService = require('../services/userService');
const {updateUserById} =require('../daos/userDao')

async function getAllUsers(req, res) {
    console.log("-----------------------------");
    try {
        console.log("000000000000000000000000000000000");
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function deleteUser(req, res) {
    console.log("8888888888888888888888888");
    const userId = req.params.id;
    console.log("userId",userId);
    try {
        const result = await userService.deleteUser(userId);
        if (result.deletedCount === 1) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function addUser(req, res) {
    try {
        const userId = await userService.addUser(req.body);
        res.status(201).json({ userId });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add user' });
    }
}

async function updateUser(req, res) {
    const { userId } = req.params;
    const { name, contact, address } = req.body;
    const updatedUserData = { name, contact, address };

    try {
        await updateUserById(userId, updatedUserData);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
}

module.exports = {
    getAllUsers, deleteUser, addUser, updateUser
};
