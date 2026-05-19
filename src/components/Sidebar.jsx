import { NavLink, useNavigate } from "react-router-dom";

import logo from "../images/logo.png";
import dashboard from "../images/dashboard.png";
import complainant from "../images/complainant.png";
import personnel from "../images/personnel.png";
import reports from "../images/report.png";
import logoutIcon from "../images/logout.png";

export default function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="logo-section">
        <img src={logo} alt="logo" className="logo" />
        <h3>TIBGAO EREPORT</h3>
      </div>

      {/* DASHBOARD */}
      <NavLink
        to="/PersonnelDashboard"
        end
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <img src={dashboard} alt="" />
        Dashboard
      </NavLink>

      {/* COMPLAINANT */}
      <NavLink
        to="/complainant-management"
        end
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        <img src={complainant} alt="" />
        Complainant Management
      </NavLink>

     {/* PERSONNEL */}
<NavLink
  to="/personnel-management"
  end
  className={({ isActive }) =>
    isActive ? "menu active" : "menu"
  }
>
  <img src={personnel} alt="" />
  Personnel Management
</NavLink>

{/* REPORTS */}
<NavLink
  to="/report-management"
  end
  className={({ isActive }) =>
    isActive ? "menu active" : "menu"
  }
>
  <img src={reports} alt="" />
  Report Management
</NavLink>
{/* LOGOUT (DIRECTLY UNDER REPORTS) */}
<button
  className="menu logout-btn"
  onClick={handleLogout}
  style={{ marginTop: "0" }}
>
  <img src={logoutIcon} alt="" />
  Logout
</button>

    </div>
  );
}