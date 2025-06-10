import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("Authorization");
        navigate("/");
    }
    return(
        <button onClick={handleLogout} className="login">
      Logout
    </button>
    )
}