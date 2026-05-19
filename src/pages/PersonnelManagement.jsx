import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { API } from "../api";
import "../DashStyles.css";

export default function PersonnelManagement() {

  const emptyForm = {
    personnel_id: "",
    personnel_name: "",
    designation: "",
    username: "",
    password: ""
  };

  const [list, setList] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/personnel");
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
      await API.post("/personnel", form);
      fetchData();
      reset();
    } catch (err) {
      console.log("CREATE ERROR:", err);
    }
  };

  const update = async () => {
    try {
      await API.put(`/personnel/${form.personnel_id}`, form);
      fetchData();
      reset();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  const del = async (id) => {
    if (!id) return console.log("Missing ID");
    if (!window.confirm("Delete this personnel?")) return;

    try {
      await API.delete(`/personnel/${id}`);
      fetchData();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  const editRow = (p) => {
    setForm(p);
    setEdit(true);
  };

  const reset = () => {
    setForm(emptyForm);
    setEdit(false);
  };

  // 🔍 FILTER LOGIC
  const filteredList = list.filter((p) =>
    `${p.personnel_name} ${p.username} ${p.designation}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="dashboard-container">

        {/* FORM */}
        <div className="top-section">
          <div className="summary-card" style={{ width: "100%" }}>
            <h3>{edit ? "Edit Personnel" : "Add Personnel"}</h3>

            <input
              name="personnel_id"
              value={form.personnel_id}
              onChange={handleChange}
              placeholder="Personnel ID"
            />

            <input
              name="personnel_name"
              value={form.personnel_name}
              onChange={handleChange}
              placeholder="Name"
            />

            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="Designation"
            />

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
            />

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
            />

            <div style={{ display: "flex", gap: "10px" }}>
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
          <h2>Personnel Records</h2>

          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((p) => (
                  <tr key={p.personnel_id}>
                    <td>{p.personnel_id}</td>
                    <td>{p.personnel_name}</td>
                    <td>{p.designation}</td>
                    <td>{p.username}</td>

                    <td>
                      <button onClick={() => editRow(p)}>Edit</button>
                      <button onClick={() => del(p.personnel_id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No personnel found
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