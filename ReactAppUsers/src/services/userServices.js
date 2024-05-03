// src/services/userService.js
const API_URL = 'http://localhost:3000/api';

async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return response.json();
}

async function deleteUser(userId) {
    const response = await fetch(`${API_URL}/deleteuser/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.status}`);
    }
  }

async function addUser(user) {
  const response = await fetch(`${API_URL}/adduser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error(`Failed to add user: ${response.status}`);
  }
}

async function editUser(userId, updatedUserData) {
    console.log("updatedUserData", updatedUserData);
    const response = await fetch(`${API_URL}/edituser/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUserData)
      
    });
    if (!response.ok) {
      throw new Error(`Failed to edit user: ${response.status}`);
    }
  }
  

export { getUsers, deleteUser, addUser, editUser };
