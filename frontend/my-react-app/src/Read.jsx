/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported

const Read = ({ isOpen, onRequestClose, data ,fetchData}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(data || {});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('');

  useEffect(() => {
    setEditableData(data || {});
  }, [data]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setAction('save');
    setIsPopupOpen(true);
  };

  const handleDeleteClick = () => {
    setAction('delete');
    setIsPopupOpen(true);
  };

  const handleSubmit = async () => {
    if (password === 'Inventory@123') {
      try {
        if (action === 'save') {
          // Update the data
          const response = await axios.put(`http://localhost:5000/data/${editableData.id}`, editableData);
          console.log('Update response:', response.data);
          await fetchData();
          setIsEditing(false);
        } else if (action === 'delete') {
          // Delete the data
          const response = await axios.delete(`http://localhost:5000/data/${editableData.id}`);
          console.log('Delete response:', response.data);
          alert('Data deleted successfully');
          await fetchData();
          onRequestClose(); // Close the modal after deletion
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
      setIsPopupOpen(false);
      setPassword("");
    } else {
      alert('Incorrect password');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBackClick = () => {
    setIsEditing(false);
    
  };

  const handleCancelClick = () => {
    setIsPopupOpen(false);
    setPassword("");
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal-dialog-centered">
      <div className="bg-light p-4 rounded shadow-sm">
        <div className="container">
          <h2 className="text-center mb-4 text-primary">Data Details</h2>
          {isEditing ? (
            <div className="d-flex flex-column gap-3">
              <div className="form-group">
                <label className="text-success">Rack:</label>
                <input
                  className="form-control"
                  type="text"
                  name="Rack"
                  value={editableData.Rack || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="text-success">DeviceType:</label>
                <input
                  className="form-control"
                  type="text"
                  name="DeviceType"
                  value={editableData.DeviceType || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="text-success">MAC:</label>
                <input
                  className="form-control"
                  type="text"
                  name="MAC"
                  value={editableData.MAC || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="text-success">Location:</label>
                <input
                  className="form-control"
                  type="text"
                  name="Location"
                  value={editableData.Location || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="text-success">Status:</label>
                <input
                  className="form-control"
                  type="text"
                  name="Status"
                  value={editableData.Status || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button className="btn btn-success" onClick={handleSaveClick}>Save</button>
                <button className="btn btn-secondary" onClick={handleBackClick}>Back</button>
              </div>
            </div>
          ) : (
            <div>
              <p><strong className="text-primary">Rack:</strong> {editableData.Rack}</p>
              <p><strong className="text-primary">DeviceType:</strong> {editableData.DeviceType}</p>
              <p><strong className="text-primary">MAC:</strong> {editableData.MAC}</p>
              <p><strong className="text-primary">Location:</strong> {editableData.Location}</p>
              <p><strong className="text-primary">Status:</strong> {editableData.Status}</p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button className="btn btn-warning" onClick={handleEditClick}>Edit</button>
                <button className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
                <button className="btn btn-secondary" onClick={onRequestClose}>Close</button>
              </div>
            </div>
          )}
          
          {isPopupOpen && (
            <div className="popup fixed-top d-flex justify-content-center align-items-center">
              <div className="bg-white p-4 rounded shadow-sm">
                <h2 className="text-center mb-3 text-danger">Enter your password</h2>
                <input
                  type="password"
                  className="form-control mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Read;
