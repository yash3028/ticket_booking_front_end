import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";
import Logout from "./Logout";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    setIsLoggedIn(!!token);
  }, []);
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
          <Logout />
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
