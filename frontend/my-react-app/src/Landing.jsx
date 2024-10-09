/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Read from "./Read";
import CreateModal from "./Create";
import RackFilter from "./RackFilter";
import MacSearch from "./MacSearch";
import DeviceTypeList from "./DeviceTypeList";
import DataTable from "./DataTable";

const NetworkManagement = () => {
  const [searchMac, setSearchMac] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [data, setData] = useState([]);
  const [selectedRack, setSelectedRack] = useState("");
  const [racks, setRacks] = useState([]);
  const [deviceCounts, setDeviceCounts] = useState({});

  useEffect(() => {
    const fetchDeviceCounts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/device-counts");
        setDeviceCounts(response.data);
      } catch (error) {
        console.error("Error fetching device counts:", error);
      }
    };
    fetchDeviceCounts();
  }, []);

  useEffect(() => {
    const fetchRacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/racks");
        setRacks(response.data);
      } catch (error) {
        console.error("Error fetching racks:", error);
      }
    };
    fetchRacks();
  }, []);

  const fetchData = useCallback(async () => {
    if (selectedRack === "" || selectedRack === "Select Rack") {
      setData([]);
    } else if (selectedRack === "All Racks") {
      try {
        const response = await axios.get("http://localhost:5000/data/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching all data:", error);
        setData([]);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/data/rack/${selectedRack}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data by rack:", error);
        setData([]);
      }
    }
  }, [selectedRack]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  

  const handleStatusChange = async (deviceType, statusType) => {
    setSelectedRack("");
    setSearchMac("");
    setData([]);

    try {
      const response = await axios.get(
        `http://localhost:5000/data/status/${deviceType}/${statusType}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching devices by status:", error);
      setData([]);
    }
  };

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="col-lg-12 col-md-12 mb-3">
          <DeviceTypeList
            deviceCounts={deviceCounts}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkManagement;
