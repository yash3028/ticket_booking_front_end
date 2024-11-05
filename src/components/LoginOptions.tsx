import { Link } from "react-router-dom";
function LoginOptions(){
    return (
        <div className="login_options">
            <h2>Select Login Type</h2>
            <button className="login-btn">
                <Link to="/user-login">
                Login as User
                </Link>
            </button>
            <button className="login-btn">
                <Link to="/agent-login">
                Login as Agent
                </Link>
            </button>
        </div>
    );
};
export default LoginOptions