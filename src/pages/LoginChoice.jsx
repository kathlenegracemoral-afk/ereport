import { useNavigate } from "react-router-dom";

function LoginChoice() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">

      <div className="choice-box">

        <h1>Login As</h1>

        <button onClick={() => navigate("/login")}>
          Complainant
        </button>

        <button onClick={() => navigate("/personnel-login")}>
          Personnel / Admin
        </button>

      </div>

    </div>
  );
}

export default LoginChoice;