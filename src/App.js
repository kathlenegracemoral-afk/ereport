import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PersonnelLogin from "./pages/PersonnelLogin";
import CreateReport from "./pages/create-report";
import ComplainantDashboard from "./pages/ComplainantDashboard";
import PersonnelDashboard from "./pages/PersonnelDashboard";

import PersonnelManagement from "./pages/PersonnelManagement";
import ComplainantManagement from "./pages/ComplainantManagement";
import ReportManagement from "./pages/ReportManagement";

import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/personnel-login" element={<PersonnelLogin />} />
<Route path="/create-report" element={<CreateReport />} />
        <Route path="/PersonnelDashboard" element={<PersonnelDashboard />} />
        <Route path="/ComplainantDashboard" element={<ComplainantDashboard />} />

        <Route path="/complainant-management" element={<ComplainantManagement />} />
        <Route path="/personnel-management" element={<PersonnelManagement />} />
        <Route path="/report-management" element={<ReportManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;