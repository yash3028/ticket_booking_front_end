import { Link } from "react-router-dom"

function AgentLogin(){
    return (
        <div className="login-page">
            <h2>Agent Login</h2>
        <form>
            <label>Agent Id:
                <input type="text" id="user-id" name="user-id" required />
            </label>
            <label>
                Password:
                <input type="password" id="password" name="password" required />
            </label>
            <button type="submit" className="submit">Login</button>
            <button className="agent-sign" type="submit">
                <Link to="/agentsign">Sign Up</Link>
            </button>
        </form>
    </div>
    )
}

export default AgentLogin