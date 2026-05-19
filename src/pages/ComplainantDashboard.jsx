import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api";
import "../CompDashStyles.css";
import "../dashboard.css";
import newIcon from "../images/new.png";
import logo from "../images/logo.png";
import welcome from "../images/welcomes.png";
import pendingIcon from "../images/pending.png";
import ongoingIcon from "../images/ongoing.png";
import resolvedIcon from "../images/resolved.png";

export default function ComplainantDashboard() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);

  const [summary, setSummary] = useState({
    newCount: 0,
    pendingCount: 0,
    ongoingCount: 0,
    resolvedCount: 0,
    totalReports: 0
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");
const complainantName = user?.complainant_name || "User";

  useEffect(() => {
    if (!user?.complainant_id) {
      navigate("/login");
      return;
    }

    fetchReports();
  }, [user?.complainant_id]);

  const fetchReports = async () => {
    try {
      const complainantId = user?.complainant_id;
      if (!complainantId) return;

      const res = await API.get(`/my-reports/${complainantId}`);

      const data = Array.isArray(res.data) ? res.data : [];

      setReports(data);

      setSummary({
        newCount: data.filter(r => r.status === "New").length,
        pendingCount: data.filter(r => r.status === "Pending").length,
        ongoingCount: data.filter(r => r.status === "Ongoing").length,
        resolvedCount: data.filter(r => r.status === "Resolved").length,
        totalReports: data.length
      });

    } catch (err) {
      console.log("FETCH REPORTS ERROR:", err);
    }
  };

  return (
    <div className="complainant-page">

      {/* ================= NAVBAR ================= */}
      <div className="top-navbar">

        <div className="nav-left">
          <img src={logo} alt="logo" />

          <div className="brand-text">
            <h2>TIBGAO</h2>
            <p>eReport</p>
          </div>
        </div>

        <div className="nav-right">
          <Link to="/ComplainantDashboard">Dashboard</Link>
          <Link to="/create-report">Create Report</Link>
          <Link to="/" onClick={() => localStorage.removeItem("user")}>
            Logout
          </Link>
        </div>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="top-cards">

    <div className="welcome-card">
  <div>
    <h1>Welcome, {complainantName} </h1>
    <p>Here's your real-time report summary</p>
  </div>

  <img src={welcome} alt="welcome" className="welcome-img" />
</div>

        <div className="summary-card">

          <h2>My Report Summary</h2>
		  
		  <div className="summary-item">
  <div className="left">
    <img src={newIcon} alt="New" />
    <span>New:</span>
  </div>
  <span>{summary.newCount}</span>
</div>

          <div className="summary-item">
            <div className="left">
              <img src={pendingIcon} alt="" />
              <span>Pending:</span>
            </div>
            <span>{summary.pendingCount}</span>
          </div>

          <div className="summary-item">
            <div className="left">
              <img src={ongoingIcon} alt="" />
              <span>Ongoing:</span>
            </div>
            <span>{summary.ongoingCount}</span>
          </div>

          <div className="summary-item">
            <div className="left">
              <img src={resolvedIcon} alt="" />
              <span>Resolved:</span>
            </div>
            <span>{summary.resolvedCount}</span>
          </div>

          <h3>Total Reports: {summary.totalReports}</h3>

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="report-table-card">

        <h2 className="table-title">
          My Reports
        </h2>

        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Title</th>
              <th>Photo</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action Description</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {reports.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No reports found for this account.
                </td>
              </tr>
            ) : (
              reports.map((r) => (
                <tr key={r.report_id}>
                  <td>{r.report_id}</td>
                  <td>{r.title}</td>

                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${r.photo_path}`}
                      alt="report"
                      className="table-img"
                    />
                  </td>

                  <td>{r.category_title}</td>

                  <td>
                    <span className={`status ${r.status}`}>
                      {r.status}
                    </span>
                  </td>

                  {/* ✅ ACTION DESCRIPTION ADDED */}
                  <td>
                    {r.action_description
                      ? r.action_description
                      : "None"}
                  </td>

                  <td>
                    {new Date(r.date).toLocaleDateString()}
                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>

      </div>

    </div>
  );
}