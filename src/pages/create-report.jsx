import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import "../report.css";
import leftDesign from "../images/left-design.png";
import rightDesign from "../images/right-design.png";

/* IMAGES */
import logo from "../images/logo.png";
import heroBg from "../images/rep.png";

function CreateReport() {

  const [category, setCategory] = useState("complaint");
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    category_name: "",
    date: "",
    location: "",
    description: "",
    photo: null
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/categories/${category}`)
      .then((res) => {

        setCategoryOptions(res.data);

        setFormData((prev) => ({
          ...prev,
          category_name: res.data?.[0] || "",
        }));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load categories");
      });

  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoto = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0]
    }));
  };
  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.date) return "Date is required";
    if (!formData.location.trim()) return "Location is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.photo) return "Photo is required";
    if (!formData.category_name) return "Category is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "null");

    const data = new FormData();

    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("photo", formData.photo);

    data.append("category_title", category); // complaint / incident
    data.append("category_name", formData.category_name); 
    data.append("complainant_id", user?.complainant_id || "");

    try {
      await axios.post("http://localhost:5000/api/reports", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Report created successfully!");

      setFormData({
        title: "",
        category_id: "",
        category_name: "",
        date: "",
        location: "",
        description: "",
        photo: null
      });

    } catch (err) {
      console.log("SUBMIT ERROR:", err.response?.data || err);
      toast.error("Failed to submit report");
    }
  };

  return (
    <div className="report-container">

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

      {/* ================= HERO ================= */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
	   <img
    src={leftDesign}
    alt="left design"
    className="hero-side-img left-img"
  />

  {/* RIGHT DESIGN */}
  <img
    src={rightDesign}
    alt="right design"
    className="hero-side-img right-img"
  />
        <h1>
          {category === "complaint"
            ? "Complaint Filing"
            : "Incident Report"}
        </h1>

        <p>
          {category === "complaint"
            ? "Got any Complaint to Report?"
            : "Got any Incident to Report?"}
          <br />
          Fill out the form to file a report
        </p>
      </div>

      {/* ================= FORM ================= */}
      <form className="report-form-section" onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="complaint">Complaint</option>
              <option value="incident">Incident</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category Name *</label>
            <select
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
            >
              {categoryOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group photo-box">
            <label>Upload Photo *</label>
            <input type="file" onChange={handlePhoto} />
          </div>

          <div className="form-group description-box">
            <label>Description *</label>
            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="button-group">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              setFormData({
                title: "",
                category_id: "",
                category_name: "",
                date: "",
                location: "",
                description: "",
                photo: null
              })
            }
          >
            Cancel
          </button>

          <button type="submit" className="submit-btn">
            Submit
          </button>

        </div>

      </form>
	  

    </div>
  );
}

export default CreateReport;