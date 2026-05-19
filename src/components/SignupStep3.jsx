import axios from "axios";
import { useState } from "react";

function SignupStep3({ formData, setFormData, prevStep }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        complainant_name: formData.complainant_name || "",
        email: formData.email || "",
        phone_number: formData.phone_number || "",
        address: formData.address || "",
        civil_status: formData.civil_status || "",
        gender: formData.gender || "",
        username: formData.username,
        password: formData.password
      });

      setTrackingId(response.data.trackingId);
      setSuccess(true);

      console.log("Signup Success:", response.data);

    } catch (error) {
      console.log("FULL ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>

      <label>Username</label>
      <input
        type="text"
        value={formData.username || ""}
        onChange={(e) =>
          setFormData({ ...formData, username: e.target.value })
        }
      />

      <label>Password</label>
      <input
        type="password"
        value={formData.password || ""}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      <label>Confirm Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="button-group">
        <button onClick={prevStep}>← Back</button>

        <button
          className="create-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>

      {success && (
        <div className="success-box">
          <h2>Account Created Successfully</h2>
          <h1 className="tracking-id">{trackingId}</h1>
        </div>
      )}
    </div>
  );
}

export default SignupStep3;