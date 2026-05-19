import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { API } from "../api";
import "../DashStyles.css";

export default function Complainant() {

  const emptyForm = {
    complainant_id: "",
    complainant_name: "",
    email: "",
    phone_number: "",
    address: "",
    civil_status: "",
    gender: "",
    username: "",
    password: ""
  };

  const [list, setList] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/complainants");
      setList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const create = async () => {
    try {
      await API.post("/complainants", form);
      fetchData();
      reset();
    } catch (err) {
      console.log("CREATE ERROR:", err);
    }
  };

  const update = async () => {
    try {
      await API.put(`/complainants/${form.complainant_id}`, form);
      fetchData();
      reset();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  const del = async (id) => {
    if (!id) return;

    if (!window.confirm("Delete this complainant?")) return;

    try {
      await API.delete(`/complainants/${id}`);
      fetchData();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  const editRow = (c) => {
    setForm({ ...c });
    setEdit(true);
  };

  const reset = () => {
    setForm(emptyForm);
    setEdit(false);
  };

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="dashboard-container">

        {/* FORM */}
        <div className="top-section">
          <div className="summary-card" style={{ width: "100%" }}>
            <h3>{edit ? "Edit Complainant" : "Add Complainant"}</h3>

            <div className="form-grid">
              {Object.keys(emptyForm).map((key) => (
                <input
                  key={key}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={key}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {!edit ? (
                <button onClick={create}>Create</button>
              ) : (
                <button onClick={update}>Update</button>
              )}
              <button onClick={reset}>Clear</button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="tracker-card">
          <h2>Complainant Records</h2>

          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Civil Status</th>
                <th>Gender</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.length > 0 ? (
                list.map((c) => (
                  <tr key={c.complainant_id}>
                    <td>{c.complainant_id}</td>
                    <td>{c.complainant_name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone_number}</td>
                    <td>{c.address}</td>
                    <td>{c.civil_status}</td>
                    <td>{c.gender}</td>
                    <td>{c.username}</td>

                    <td>
                      <button onClick={() => editRow(c)}>Edit</button>
                      <button onClick={() => del(c.complainant_id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No data found
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