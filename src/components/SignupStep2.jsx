function SignupStep2({ formData, setFormData, nextStep, prevStep }) {
  return (
    <>
      <h1>Sign Up</h1>

      <label>Address</label>
      <input
        type="text"
        placeholder="Enter your address"
        value={formData.address || ""}
        onChange={(e) =>
          setFormData({ ...formData, address: e.target.value })
        }
      />

      <label>Civil Status</label>
      <select
        value={formData.civil_status || ""}
        onChange={(e) =>
          setFormData({ ...formData, civil_status: e.target.value })
        }
      >
        <option value="">Select status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Widowed">Widowed</option>
      </select>

      {/* GENDER */}
      <label>Gender</label>
      <select
        value={formData.gender || ""}
        onChange={(e) =>
          setFormData({ ...formData, gender: e.target.value })
        }
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* BUTTONS */}
      <div className="button-group">
        <button onClick={prevStep}>← Back</button>
        <button onClick={nextStep}>Next →</button>
      </div>
    </>
  );
}

export default SignupStep2;