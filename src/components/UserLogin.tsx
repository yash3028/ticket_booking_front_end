import { Link} from "react-router-dom"
import '../styles/userlogin.css'
import '../services/Request'
function UserLogin(){

    return (
        <div className="login-page">
            <h2>User Login</h2>
            <form>
                <label>User Id:
                    <input type="text" id="user-id" name="user-id" required />
                </label>
                <label>
                    Password:
                    <input type="password" id="password" name="password" required />
                </label>
                <div className="btns">
                <button className='sign-in'>
                <Link to="/usersign">Sign In</Link>
              </button>
              <button className='sign-in'>
                <Link to="/user-login">Login</Link>
              </button>
              </div>
            </form>
        </div>
    )
}
export default UserLogin