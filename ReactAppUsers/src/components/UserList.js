import React, { useState, useEffect } from 'react';
// import DeviceList from './DeviceList';
import '../App.css';
import { getUsers, deleteUser, editUser } from '../services/userServices';
import Modal from './Modal';
// import {getDevicesName} from '../services/deviceServices'

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                name: selectedUser.name,
                contact: selectedUser.contact,
                address: selectedUser.address,
            });
        }
    }, [selectedUser]);
    
    useEffect(() => {
        getUsers()
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error));
    }, []);
    console.log("user",users);


    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            contact: user.contact,
            address: user.address,
        });
        setIsModalOpen(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await editUser(selectedUser._id, formData);
          console.log('Form submitted with data:', formData);
          setUsers(users.map(user => user._id === selectedUser._id ? {...user, ...formData} : user));

          setIsModalOpen(false);
          setFormData({
            name: "",
            contact: "",
            address: "",
          });
    
          // Optionally, you can fetch the updated user list after editing a user
          // await fetchUsers();
        } catch (error) {
          console.error('Error editing user:', error);
          // Handle error (e.g., show error message to user)
        }
      };
      const handleDelete = (userId) => {
        setSelectedUserId(userId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            await deleteUser(selectedUserId);
            setUsers(users.filter(user => user._id !== selectedUserId));
            setIsDeleteModalOpen(false);
            console.log(`Deleted user with ID: ${selectedUserId}`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


  const handleClick = (deviceId) => {
    try {
      console.log("id", deviceId);
      const url = new URL('/devices', window.location.href);
      url.searchParams.append('deviceId', deviceId);
      window.location.href = url.toString();
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };

console.log("user",users);
  return (
    <div>
      {users.map(user => (
        <div key={user._id} className="user">
          <div className="user-info">
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Contact:</strong> {user.contact}
            </div>
            <div>
              <strong>Address:</strong> {user.address}
            </div>
            <div>
              <strong>Device:</strong>
            </div>
            <br></br>
                    
            <div style={{ display: 'flex' }}>
    {Object.entries(user.devices).length === 0 ? (
        <div>No devices added by user</div>
    ) : (
        Object.entries(user.devices).map(([deviceId, deviceName]) => (
            <div key={deviceId} style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '5px',
                marginRight: '10px',
                cursor: 'pointer'
            }} onClick={() => handleClick(deviceId)}>
                {deviceName}
            </div>
        ))
    )}
</div>

          
          <br></br>

          <div className="user-actions">

            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </div>
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Contact:
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Update</button>
                </form>
            </Modal>
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div>
                    <p>Are you sure you want to delete this user?</p>
                    <button onClick={handleDeleteConfirmation}>Delete</button>
                    <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                </div>
            </Modal>
    </div>
  );
};


export default UserList;
