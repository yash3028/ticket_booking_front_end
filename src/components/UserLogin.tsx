import { Link } from "react-router-dom"
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
                <button className='sign-in'>
                <Link to="/usersign">Login</Link>
              </button>
            </form>
        </div>
    )
}
export default UserLogin