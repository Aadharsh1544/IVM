/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import DeviceTypeCard from './DeviceTypeCard';
 
const DeviceTypeList = ({ deviceCounts, handleStatusChange }) => {
  const [deviceTypes, setDeviceTypes] = useState([]);
 
  useEffect(() => {
    const fetchDeviceTypes = async () => {
      try {
        const response = await fetch('http://localhost:5000/device-types');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDeviceTypes(data);
      } catch (error) {
        console.error('Error fetching device types:', error);
      }
    };
 
    fetchDeviceTypes();
  }, []);
 
  return (
    <div className="row gx-3 gy-3 device-types-container">
      {deviceTypes.map((deviceType, index) => (
        <DeviceTypeCard
          key={index}
          deviceType={deviceType}
          activeCount={deviceCounts[deviceType]?.active}
          inactiveCount={deviceCounts[deviceType]?.inactive}
          handleStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};
 
export default DeviceTypeList;
 
