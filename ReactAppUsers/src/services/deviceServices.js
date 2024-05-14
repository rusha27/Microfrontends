const API_URL = 'http://localhost:3000/api';

async function getDevicesName(deviceId) {
    console.log("deviceid",deviceId);
  const response = await fetch(`${API_URL}/devicesname/${deviceId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return response.json();
}

export{getDevicesName}