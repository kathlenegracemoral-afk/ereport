import { useState } from "react"
import axios from "axios"

import Navbar from "../components/Navbar"
import ProgressBar from "../components/ProgressBar"
import SignupStep1 from "../components/SignupStep1"
import SignupStep2 from "../components/SignupStep2"
import SignupStep3 from "../components/SignupStep3"

import { Button } from "../components/ui/button"

import signPic from "../images/signpic.png"
import "../styles.css"

function SignupPage() {

  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    civilStatus: "",
    gender: "",
    username: "",
    password: ""
  })

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(
        "http://localhost:3000/api/signup",
        {
          username: formData.username,
          password: formData.password
        }
      )

      alert(res.data.message)

      console.log("Signup Success:", res.data)

    } catch (err) {

      console.log(err)

      alert("Signup failed")
    }
  }

  return (

    <div className="container">

      <Navbar />

      <div className="signup-layout">

        <div className="left-side">
          <img src={signPic} alt="illustration" />
        </div>

        <div className="right-side">

          <ProgressBar step={step} />

          {step === 1 && (
            <SignupStep1
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
            />
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <SignupStep2
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <SignupStep3
              formData={formData}
              setFormData={setFormData}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          )}

         

     

        </div>

      </div>

    </div>
  )
}

export default SignupPage