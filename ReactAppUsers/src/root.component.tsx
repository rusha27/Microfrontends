import React, { useState } from "react";
import UserList from "./components/UserList"; // Assuming UserList is your user list component
import {addUser} from "./services/userServices"
import Modal from "../src/components/Modal";

export default function Root(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    devices: [],
  });

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwt_token');
    // Redirect to the login page or perform any other necessary actions
    window.location.href = '/login'; // Replace '/login' with the URL of your login page
  };

  const handleAddClick = () => {
    // setShowForm(true);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDevice = () => {
    setFormData((prevData) => ({
      ...prevData,
      devices: [...prevData.devices, ""],
    }));
  };

  const handleDeviceChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedDevices = [...prevData.devices];
      updatedDevices[index] = value;
      return {
        ...prevData,
        devices: updatedDevices,
      };
    });
  };

  const handleRemoveDevice = (index) => {
    setFormData((prevData) => {
      const updatedDevices = [...prevData.devices];
      updatedDevices.splice(index, 1);
      return {
        ...prevData,
        devices: updatedDevices,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(formData);
      setIsModalOpen(false);
      // setShowForm(false);
      setFormData({
        name: "",
        contact: "",
        address: "",
        devices: [],
      });
      
      // Optionally, you can fetch the updated user list after adding a user
      // await fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <section>
      {/* {props.name} is mounted! */}
      <div>
        {/* <a href="/devices">Devices</a> */}
        <button onClick={handleLogout}>Logout</button>
        <button className="add-btn" onClick={handleAddClick}>Add User</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
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
          <label>
            Devices:
            {formData.devices.map((device, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={device}
                  onChange={(e) => handleDeviceChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDevice(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddDevice}>
              Add Device
            </button>
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <UserList />
    </section>
  );
}
