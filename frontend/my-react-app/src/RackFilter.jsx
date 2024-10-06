/* eslint-disable react/prop-types */
import React from 'react';

const RackFilter = ({ selectedRack, handleRackChange, racks }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Rack:</label>
      <select
        className="form-select form-select-sm"
        value={selectedRack}
        onChange={handleRackChange}
      >
        <option value="">Select Rack</option>
        {racks.map((rack, index) => (
          <option key={index} value={rack.Rack}>
            {rack.Rack}
          </option>
        ))}
        <option value="All Racks">All Racks</option>
      </select>
    </div>
  );
};

export default RackFilter;
