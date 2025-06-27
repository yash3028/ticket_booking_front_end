import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}
export default function Logout({ isLoggedIn, setIsLoggedIn }: LogoutProps) {
     const navigate = useNavigate();

  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("Authorization");
      setIsLoggedIn(false);
      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    } else {
      navigate("/login-options");
    }
  };

    return(
        
        <button onClick={handleLogout} className="login">
        {isLoggedIn ?
        "Logout": "Login"
        }
    </button>
    )
}