import { Link } from "react-router-dom";
import '../services/Request';
import {Login} from '../models/Logincred.model'
import { post_request } from "../services/Request";

function AgentLogin() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const mobileNo = (e.target as HTMLFormElement).elements.namedItem("user-id") as HTMLInputElement;
        const password = (e.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
        const user:Login = {
            mobile: mobileNo.value,
            password: password.value,
            token: null
        }
        try{
        const response = await post_request("http://localhost:3001/users/agent",user)
            if (response.status==200){
                alert('login success')
            }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch(error:any){
        if(error.response && error.response.status==401){
            alert("sign up")
        }
      }
       
       
    };

    return (
        <div className="login-page">
            <h2>Agent Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Agent Id:
                    <input type="text" id="user-id" name="user-id" required />
                </label>
                <label>
                    Password:
                    <input type="password" id="password" name="password" required />
                </label>
                <div className="btns">
                    <button type="submit" className="sign-in">
                        Login
                    </button>
                    <button className="sign-up">
                        <Link to="/agentsign">Sign Up</Link>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AgentLogin;
