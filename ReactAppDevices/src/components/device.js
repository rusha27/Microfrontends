import React, { useState, useEffect } from 'react';
import { getDevice } from '../services/deviceServices';
import './device.css'
import { useLocation } from 'react-router-dom';


const Device = () => {
    console.log("device component");
    const [device, setDevice] = useState(null);
    console.log("1");
    // const location = useLocation();
    console.log("2");
    const queryParams = new URLSearchParams(location.search);
    console.log("queryparams",queryParams);
    const deviceId = queryParams.get('deviceId');
    console.log("deviceId",deviceId);


 useEffect(() => {
    const fetchDevice = async () => {
      try {
        if (!deviceId) {
          console.error('Device ID not found in query parameters');
          return;
        }

        const deviceData = await getDevice(deviceId);
        setDevice(deviceData);
      } catch (error) {
        console.error('Error fetching device:', error);
      }
    };

    fetchDevice();
  }, []);

  return (
    <div>
      {device && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{device.name}</h5>
            <p className="card-text">Configuration:</p>
            <ul>
              {device.configuration.map((config, index) => (
                <li key={index}>{config}</li>
              ))}
            </ul>
            <p className="card-text">Type: {device.type}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Device;
