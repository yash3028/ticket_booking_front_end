import "../styles/loginoptions.css";
import { Link } from "react-router-dom";
// import CitiesList from "./Searchable";
function LoginOptions() {
  return (
    <div className="login_options">
      {/* <CitiesList /> */}
      <h2>Select Login Type</h2>
      <button type="submit" className="login-btn">
        <Link to="/user-login">Login as User</Link>
      </button>
      <br />
      <button type="submit" className="login-btn">
        <Link to="/agent-login">Login as Agent</Link>
      </button>
    </div>
  );
}
export default LoginOptions;
