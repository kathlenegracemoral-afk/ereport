import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { API } from "../api";
import "../DashStyles.css";

export default function ReportManagement() {

  const emptyForm = {
    report_id: "",
    title: "",
    description: "",
    location: "",
    date: "",
    status: "Pending",
    complainant_id: "",
    action_description: "",
    photo: null
  };

  const [form, setForm] = useState(emptyForm);
  const [list, setList] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/reports");
      setList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setForm(prev => ({ ...prev, photo: files?.[0] || null }));
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value ?? ""
    }));
  };

  const create = async () => {
    try {
      const formData = new FormData();
	  formData.append("category_name", "Others");
formData.append("category_title", "Incident");

      Object.keys(form).forEach(k => {
        formData.append(k, form[k] ?? "");
      });

      await API.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      fetchData();
      setForm(emptyForm);
    } catch (err) {
      console.log("CREATE ERROR:", err);
    }
  };

  const update = async () => {
    try {
      await API.put(`/reports/${form.report_id}`, form);
      fetchData();
      setForm(emptyForm);
      setEditMode(false);
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  const editRow = (r) => {
    setForm({
      report_id: r.report_id || "",
      title: r.title || "",
      description: r.description || "",
      location: r.location || "",
      date: r.date ? r.date.slice(0, 10) : "",
      status: r.status || "Pending",
      complainant_id: r.complainant_id || "",
      action_description: r.action_description || "",
      photo: null
    });

    setEditMode(true);
  };
  const del = async (id) => {
    if (!window.confirm("Delete?")) return;

    try {
      await API.delete(`/reports/${id}`);
      fetchData();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="dashboard-container">

        {/* ================= FORM ================= */}
        <div className="tracker-card">
          <h2>{editMode ? "Edit Report" : "Create Report"}</h2>

          <input
            name="report_id"
            value={form.report_id || ""}
            onChange={handleChange}
            placeholder="ID"
          />

          <input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            placeholder="Title"
          />

          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            name="location"
            value={form.location || ""}
            onChange={handleChange}
            placeholder="Location"
          />

          <input
            type="date"
            name="date"
            value={form.date || ""}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status || "Pending"}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Resolved">Resolved</option>
          </select>

          <input
            name="complainant_id"
            value={form.complainant_id || ""}
            onChange={handleChange}
            placeholder="Complainant ID"
          />

          <textarea
            name="action_description"
            value={form.action_description || ""}
            onChange={handleChange}
            placeholder="Action Description"
          />

          <input
            type="file"
            name="photo"
            onChange={handleChange}
          />

          <button onClick={editMode ? update : create}>
            {editMode ? "Update" : "Create"}
          </button>
        </div>

        <div className="tracker-card">
          <h2>Report Records</h2>

          <table border="1" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Photo</th>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th>Complainant Name</th>
                <th>Action Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.length > 0 ? (
                list.map(r => (
                  <tr key={r.report_id}>

                    <td>{r.report_id}</td>

                    <td>
                      {r.photo_path ? (
                        <img
                          src={`http://localhost:5000/uploads/${r.photo_path}`}
                          width="80"
                          alt="report"
                        />
                      ) : "No Photo"}
                    </td>

                    <td>{r.title}</td>
                    <td>{r.description}</td>
                    <td>{r.location}</td>
                    <td>{r.date?.slice(0, 10)}</td>
                    <td>{r.status}</td>
                    <td>{r.complainant_name || "N/A"}</td>
                    <td>{r.action_description || "No update"}</td>

                    <td>
                      <button onClick={() => editRow(r)}>Edit</button>
                      <button onClick={() => del(r.report_id)}>Delete</button>
                    </td>

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