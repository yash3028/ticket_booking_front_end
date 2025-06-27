import { Link } from "react-router-dom";
import "../styles/navbar.css";
import Logout from "./Logout";
import { useEffect, useState } from "react";

function Navbar() {
 
   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("Authorization"));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("Authorization"));
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
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

           
          <Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
       
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
