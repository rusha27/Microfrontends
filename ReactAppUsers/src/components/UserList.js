import React, { useState, useEffect } from 'react';
import DeviceList from './DeviceList';
import '../App.css';
import { getUsers, deleteUser, editUser } from '../services/userServices';
import Modal from './Modal';


const UserList = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      console.log(`Deleted user with ID: ${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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
            <br></br>
          
          
          <DeviceList userId={user._id} />
          
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
    </div>
  );
};

export default UserList;
