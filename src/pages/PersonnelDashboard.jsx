import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { API } from "../api";
import "../DashStyles.css";

import welcome from "../images/welcome.png";
import newIcon from "../images/new.png";
import pendingIcon from "../images/pending.png";
import ongoingIcon from "../images/ongoing.png";
import resolvedIcon from "../images/resolved.png";

export default function Dashboard() {

  const [summary, setSummary] = useState({
    newCount: 0,
    pendingCount: 0,
    ongoingCount: 0,
    resolvedCount: 0,
    totalReports: 0,
    totalIncidents: 0,
    totalComplaints: 0
  });

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchReports();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await API.get("/dashboard/summary");

      setSummary({
        newCount: res.data.newCount || 0,
        pendingCount: res.data.pendingCount || 0,
        ongoingCount: res.data.ongoingCount || 0,
        resolvedCount: res.data.resolvedCount || 0,
        totalReports: res.data.totalReports || 0,
        totalIncidents: res.data.totalIncidents || 0,
        totalComplaints: res.data.totalComplaints || 0
      });

    } catch (err) {
      console.log("SUMMARY ERROR:", err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("REPORT ERROR:", err);
      setReports([]);
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="dashboard-container">

        {/* TOP */}
        <div className="top-section">

          <div className="welcome-card">
            <div>
              <h2><b>Welcome, Personnel</b></h2>
              <p>Here's your real-time report summary.</p>
            </div>
            <img src={welcome} alt="welcome" className="welcome-img" />
          </div>

          <div className="summary-card">
            <h3>Report Summary</h3>

            <div className="summary-item">
              <img src={newIcon} alt="new" />
              <span>New</span>
              <span>{summary.newCount}</span>
            </div>

            <div className="summary-item">
              <img src={pendingIcon} alt="pending" />
              <span>Pending</span>
              <span>{summary.pendingCount}</span>
            </div>

            <div className="summary-item">
              <img src={ongoingIcon} alt="ongoing" />
              <span>Ongoing</span>
              <span>{summary.ongoingCount}</span>
            </div>

            <div className="summary-item">
              <img src={resolvedIcon} alt="resolved" />
              <span>Resolved</span>
              <span>{summary.resolvedCount}</span>
            </div>

            <hr />

            <p className="total">
              Total Reports: {summary.totalReports}
            </p>
          </div>

        </div>

        {/* MIDDLE */}
        <div className="middle-section">

          <div className="mini-card">
            <h3>Total Incidents</h3>
            <p className="total">{summary.totalIncidents}</p>
          </div>

          <div className="mini-card">
            <h3>Total Complaint Reports</h3>
            <p className="total">{summary.totalComplaints}</p>
          </div>

        </div>

        {/* REPORT TRACKER (VIEW ONLY) */}
        <div className="tracker-card">
          <h2>Report Tracker</h2>

          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Photo</th>
                <th>Complainant Name</th>
                <th>Category</th>
                <th>Category Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Date and Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {reports.length > 0 ? (
                reports.map((r) => (
                  <tr key={r.report_id}>
                    <td>{r.report_id}</td>
                    <td>{r.title}</td>

                    <td>
                      {r.photo_path ? (
                        <img
                          src={`http://localhost:5000/uploads/${r.photo_path}`}
                          alt="report"
                          width="80"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: "5px" }}
                        />
                      ) : (
                        <span>No Photo</span>
                      )}
                    </td>

                    <td>{r.complainant_name || "N/A"}</td>
                    <td>{r.category_name || "N/A"}</td>
                    <td>{r.category_title || "N/A"}</td>
                    <td>{r.description}</td>
                    <td>{r.location}</td>
                    <td>{r.date}</td>
                    <td>{r.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}