/* eslint-disable react/prop-types */
import React from 'react';
import DeviceTypeCard from './DeviceTypeCard';

const DeviceTypeList = ({ deviceCounts, handleStatusChange }) => {
  const deviceTypes = [
    'APs', 'BPD R3G', 'BPD R3I', 'BPD R3W', 'Bridge', 'controller', 'eNIC', 'eROTA', 'FSU',
    'Gen4NICs', 'Gen5NICs', 'Genus DLMS/COSEM Meter', 'meter', 'meter - NIC', 'meter - uAP',
    'NIC', 'PVA', 'Raspberry PI', 'Relay', 'Relay PI', 'sAP', 'SIM', 'uAP', 'Streetlight'
  ];

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
