function SignupStep1({ formData, setFormData, nextStep }) {
  return (
    <>
      <h1>Sign Up</h1>

      {/* FULL NAME */}
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter your full name"
        value={formData.complainant_name || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            complainant_name: e.target.value
          })
        }
      />

      {/* EMAIL */}
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={formData.email || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value
          })
        }
      />

      {/* PHONE NUMBER */}
      <label>Phone Number</label>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={formData.phone_number || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone_number: e.target.value
          })
        }
      />

      <button onClick={nextStep} className="next-btn">
        Next →
      </button>
    </>
  );
}

export default SignupStep1;