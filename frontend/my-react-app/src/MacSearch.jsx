/* eslint-disable react/prop-types */
import React from 'react';

const MacSearch = ({ searchMac, setSearchMac, handleSearch }) => {
  return (
    <div className="mb-3">
      <label htmlFor="mac-search" className="form-label">
        Search by MAC:
      </label>
      <input
        type="text"
        id="mac-search"
        className="form-control form-control-sm"
        value={searchMac}
        onChange={(e) => {
          setSearchMac(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default MacSearch;
