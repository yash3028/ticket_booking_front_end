import { Link} from "react-router-dom"
import '../styles/userlogin.css'
import '../services/Request'
import { Login } from "../models/Logincred.model";
import { post_request } from "../services/Request";
function UserLogin(){
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const mobileNo = (e.target as HTMLFormElement).elements.namedItem("user-id") as HTMLInputElement;
        const password = (e.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
        const user:Login = {
            mobile: mobileNo.value,
            password: password.value,
            token: null
        }
        try {
            const response = await post_request("http://localhost:3001/users/login", user);
            
            if (response.status === 200) {
                const token = response.data.token
                if(token){
                    localStorage.setItem("authentication",token)
                    alert('Login successful');
                }
                
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert('Invalid credentials, please sign up');
            }
        }
       
       
    };

    return (
        <div className="login-page">
            <h2>User Login</h2>
            <form  onSubmit={handleSubmit}>
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
                    Login
              </button>
              </div>
            </form>
        </div>
    )
}
export default UserLogin