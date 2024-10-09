/* eslint-disable react/prop-types */


const DataTable = ({ data, openModal }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Rack</th>
            <th>DeviceType</th>
            <th>MAC</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Rack}</td>
              <td>{item.DeviceType}</td>
              <td><a href="#" onClick={() => openModal(item)}>{item.MAC}</a></td>
              <td>{item.Location}</td>
              <td>{item.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
