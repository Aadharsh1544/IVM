/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useCallback, useEffect, useState } from "react";
// import RackFilter from "./RackFilter";
// import MacSearch from "./MacSearch";
// import Read from "./Read";
// import CreateModal from "./Create";
// import axios from "axios";
// import DataTable from "./DataTable";
// import { useLocation } from "react-router-dom";

// const DeviceList = () => {
//   const location = useLocation();
//   const urlParams = new URLSearchParams(location.search);
//   const [deviceType, setDeviceType] = useState(
//     urlParams.get("deviceType") || ""
//   );
//   const [status, setStatus] = useState(urlParams.get("status") || "");

//   const [data, setData] = useState([]);
//   const [searchMac, setSearchMac] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({});
//   const [racks, setRacks] = useState([]);
//   const [selectedRack, setSelectedRack] = useState(
//     !status && !deviceType ? "" : "All Racks"
//   );

//   useEffect(() => {
//     const fetchRacks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/racks");
//         setRacks(response.data);
//       } catch (error) {
//         console.error("Error fetching racks:", error);
//       }
//     };
//     fetchRacks();
//   }, []);

//   const openModal = (data) => {
//     setModalData(data);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const openCreateModal = () => {
//     setIsCreateModalOpen(true);
//   };

//   const closeCreateModal = () => {
//     setIsCreateModalOpen(false);
//   };

//   const handleRackChange = (e) => {
//     setSelectedRack(e.target.value);
//     setSearchMac("");
//     setData([]);
//   };

//   const handleSearch = async (value) => {
//     setSearchMac(value);
//     setSelectedRack("");
//     setData([]);

//     if (value.trim() === "") {
//       setData([]);
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/data?mac=${value}`
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data by MAC:", error);
//       setData([]);
//     }
//   };

//   const fetchData = useCallback(async () => {
//     if (selectedRack === "" || selectedRack === "Select Rack") {
//       setData([]);
//     } else if (selectedRack === "All Racks") {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/data/all?deviceType=${deviceType}&status=${status}`
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching all data:", error);
//         setData([]);
//       }
//     } else {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/data/rack/${selectedRack}?deviceType=${deviceType}&status=${status}`
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data by rack:", error);
//         setData([]);
//       }
//     }
//   }, [selectedRack]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return (
//     <div className="container my-4 ">
//       <div className="col-lg-4 col-md-12 mb-3">
//         <div className="d-flex flex-column gap-3">
//           <RackFilter
//             selectedRack={selectedRack}
//             handleRackChange={handleRackChange}
//             racks={racks}
//           />
//           <MacSearch
//             searchMac={searchMac}
//             setSearchMac={setSearchMac}
//             handleSearch={handleSearch}
//           />
//         </div>
//       </div>

//       <div className="table-container">
//         <DataTable data={data} openModal={openModal} />
//       </div>

//       <Read
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         data={modalData}
//         fetchData={fetchData}
//       />
//     </div>
//   );
// };

// export default DeviceList;


/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import RackFilter from "./RackFilter";
import MacSearch from "./MacSearch";
import Read from "./Read";
import CreateModal from "./Create";
import axios from "axios";
import DataTable from "./DataTable";
import { useLocation } from "react-router-dom";

const DeviceList = ({ chartFilter }) => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [deviceType, setDeviceType] = useState(
    urlParams.get("deviceType") || chartFilter?.deviceType || ""
  );
  const [status, setStatus] = useState(urlParams.get("status") || chartFilter?.status || "");

  const [data, setData] = useState([]);
  const [searchMac, setSearchMac] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [racks, setRacks] = useState([]);
  const [selectedRack, setSelectedRack] = useState(
    !status && !deviceType ? "" : "All Racks"
  );

  // Fetch racks on component mount
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

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Handle rack change and reset the status if "All Racks" is selected
  const handleRackChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedRack(selectedValue);
    setSearchMac("");
    setData([]);

    if (selectedValue === "All Racks") {
      setStatus("");
      setDeviceType(chartFilter?.deviceType || "");  // Apply chart filters if present
    }
  };

  const handleSearch = async (value) => {
    setSearchMac(value);
    setSelectedRack("");
    setData([]);

    if (value.trim() === "") {
      setData([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/data?mac=${value}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data by MAC:", error);
      setData([]);
    }
  };

  // Fetch data based on selected rack, chart filters, or other parameters
  const fetchData = useCallback(async () => {
    if (selectedRack === "" || selectedRack === "Select Rack") {
      setData([]);
    } else if (selectedRack === "All Racks") {
      try {
        const response = await axios.get(
          `http://localhost:5000/data/all?deviceType=${chartFilter?.deviceType || deviceType}&status=${chartFilter?.status || status}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching all data:", error);
        setData([]);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/data/rack/${selectedRack}?deviceType=${deviceType}&status=${status}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data by rack:", error);
        setData([]);
      }
    }
  }, [selectedRack, deviceType, status, chartFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container my-4 ">
      <div className="col-lg-4 col-md-12 mb-3">
        <div className="d-flex flex-column gap-3">
          <RackFilter
            selectedRack={selectedRack}
            handleRackChange={handleRackChange}
            racks={racks}
          />
          <MacSearch
            searchMac={searchMac}
            setSearchMac={setSearchMac}
            handleSearch={handleSearch}
          />
        </div>
      </div>

      <div className="table-container">
        <DataTable data={data} openModal={openModal} />
      </div>

      <Read
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        data={modalData}
        fetchData={fetchData}
      />
    </div>
  );
};

export default DeviceList;
