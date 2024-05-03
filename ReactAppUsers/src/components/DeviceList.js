import React from 'react';

const deviceList = [
  { id: 1, name: 'Device 1' },
  { id: 2, name: 'Device 2' },
  { id: 3, name: 'Device 3' }
];

const DeviceList = ({ userId }) => {
  const handleClick = () => {
    // Navigate to the /devices route
    window.location.href = '/devices'; // Replace with your actual route
  };

  return (
    <div className="device-list">
      {deviceList.map(device => (
        <div key={device.id} className="device" onClick={handleClick}>
          {device.name}
        </div>
      ))}
    </div>
  );
};

export default DeviceList;
