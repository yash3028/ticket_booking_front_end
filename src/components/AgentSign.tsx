function AgentSign(){
    return (
        <div className="user-sign">
        <h2>Agent Sign In</h2>
        <form>
            <label>Full Name
                <input type="text" className="input-field" required />
            </label>
            <label>
                Mobile No
                <input type="text" className="input-field" required />
            </label>
            <label>
                Date of Birth
                <input type="date" className="input-field" required />
            </label>
            <label>
                Password:
                <input type="password" className="input-field" required />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    )
}
export default AgentSign