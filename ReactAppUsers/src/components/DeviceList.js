// import React, { useState, useEffect } from 'react';
// import { getDevicesName } from '../services/deviceServices';

// const DeviceList = ({ deviceId }) => {
//   console.log("devices",deviceId);
//   console.log("devices",typeof(deviceId) );

//   const [deviceList, setDeviceList] = useState([]);

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const devices = await getDevicesName(deviceId);
//         setDeviceList(devices);
//       } catch (error) {
//         console.error('Error fetching devices:', error);
//       }
//     };

//     fetchDevices();
//   }, []);

  

//   return (
//     <div className="device-list">
//       {deviceList.map(device => (
//         <div key={device.id} className="device" onClick={handleClick}>
//           {device.name}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DeviceList;
