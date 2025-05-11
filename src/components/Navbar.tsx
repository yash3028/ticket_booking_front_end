import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authentication");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authentication");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="head">
          <Link to="/">
            <h2 className="title">SYR</h2>
          </Link>
          <div className="head-right">
            <select className="lang">
              <option value="en">English</option>
              <option value="Te">Telugu</option>
              <option value="Hi">Hindi</option>
            </select>

            {isLoggedIn ? (
              <button className="login" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="login">
                <Link to="/login-options">Login</Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
