import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import DeviceList from "./DeviceList";
import Create from "./Create";
import Sidebar from "./Sidebar"; // Import Sidebar
import "./App.css"; // Create a CSS file for styling

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/devices" element={<DeviceList />} />
            <Route path="/create-device" element={<Create />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
