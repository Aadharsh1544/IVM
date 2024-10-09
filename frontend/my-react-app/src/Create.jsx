import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./Create.css";

const Create = () => {
  const [editableData, setEditableData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [password, setPassword] = useState("");

  // Handle creation after password validation
  const handleCreateSubmit = async () => {
    if (password === "Inventory@123") {
      try {
        const response = await axios.post(
          "http://localhost:5000/data",
          editableData
        );
        console.log("Create response:", response.data);
        alert("Data created successfully");
        setEditableData({}); // Clear form after submission
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred");
      }
      setIsPopupOpen(false);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleShowPasswordPopup = () => {
    setIsPopupOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelClick = () => {
    setIsPopupOpen(false);
    setPassword("");
  };

  return (
    <div className="p-4 rounded shadow-sm">
      <div className="container">
        <h2 className="text-left mb-4 text-primary">Create New Data</h2>
        <div className="d-flex flex-column gap-3">
          <div className="form-group">
            <label className="text-success">Rack:</label>
            <input
              className="form-control"
              type="text"
              name="Rack"
              value={editableData.Rack || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="text-success">DeviceType:</label>
            <input
              className="form-control"
              type="text"
              name="DeviceType"
              value={editableData.DeviceType || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="text-success">MAC:</label>
            <input
              className="form-control"
              type="text"
              name="MAC"
              value={editableData.MAC || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="text-success">Location:</label>
            <input
              className="form-control"
              type="text"
              name="Location"
              value={editableData.Location || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="text-success">Status:</label>
            <input
              className="form-control"
              type="text"
              name="Status"
              value={editableData.Status || ""}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-3 mt-3">
            <button
              className="btn btn-primary"
              onClick={handleShowPasswordPopup}
            >
              Create
            </button>
            <button className="btn btn-secondary">Cancel</button>
          </div>
        </div>

        {isPopupOpen && (
          <div className="popup fixed-top d-flex justify-content-center align-items-center">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="text-center mb-3 text-danger">
                Enter your password
              </h2>
              <input
                type="password"
                className="form-control mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleCreateSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
