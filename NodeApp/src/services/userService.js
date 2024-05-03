// services/userDetailsService.js
const userDao = require('../daos/userDao');

async function getUsers() {
    return userDao.getAllUsers();
}
async function deleteUser(userId) {
    return userDao.deleteUserById(userId);
}
async function addUser(user) {
    try {
        const userId = await userDao.addUser(user);
        return userId;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

module.exports = {
    getUsers, deleteUser, addUser
};
