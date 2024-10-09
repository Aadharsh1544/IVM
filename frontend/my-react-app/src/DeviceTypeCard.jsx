/* eslint-disable react/prop-types */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    title: {
      display: false,
      text: "",
    },
  },
};

const DeviceTypeCard = ({ deviceType, activeCount, inactiveCount }) => {
  const navigate = useNavigate();
  const labels = [deviceType];
  const data = {
    labels,
    datasets: [
      {
        label: "Active",
        data: [activeCount],
        backgroundColor: "rgba(99, 255, 132, 0.75)",
      },
      {
        label: "Inactive",
        data: [inactiveCount],
        backgroundColor: "rgba(255, 99, 132, 0.75)",
      },
    ],
  };

const onBarClick = (event, elements) => {
    if (elements.length > 0) {
      const { datasetIndex } = elements[0];
      console.log(elements)
      const status = datasetIndex === 0 ? "Active" : "Inactive";
      navigate(`/devices?deviceType=${deviceType}&status=${status}`);
    }
  };

  return (
    <div className="col col-xs-6 mol-md-4 col-lg-2 ">
      <div className="device-type-card px-3 py-3">
        <h5 className="text-truncate">{deviceType}</h5>
        <Bar
          options={{ ...options, onClick: onBarClick }}
          data={data}
          height={320}
        />
        {/* <p className="d-flex justify-content-between align-items-center mb-1">
        <span>{activeCount || 0}</span>
        <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(deviceType, 'Active')}>
          Active
        </button>
      </p>
      <p className="d-flex justify-content-between align-items-center mb-0">
        <span>{inactiveCount || 0}</span>
        <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(deviceType, 'Inactive')}>
          Inactive
        </button>
      </p> */}
      </div>
    </div>
  );
};

export default DeviceTypeCard;
