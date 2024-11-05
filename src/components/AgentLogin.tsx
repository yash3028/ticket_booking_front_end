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
            <button type="submit">Login</button>
        </form>
    </div>
    )
}

export default AgentLogin