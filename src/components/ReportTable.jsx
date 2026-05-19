import { useEffect, useState } from "react";
import axios from "axios";

function ReportTracker() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  // FETCH ALL REPORTS
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports");
      setReports(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load reports");
    }
  };

  return (
    <div className="container">

      <h1>Report Tracker</h1>

      {message && <p>{message}</p>}

      <table className="report-table" border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {reports?.length > 0 ? (
            reports.map((report) => (
              <tr key={report.report_id}>
                <td>{report.report_id}</td>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>{report.location}</td>
                <td>{report.date}</td>
                <td>{report.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No reports found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default ReportTracker;