import '../styles/booking.css'
function booking(){
    return(
        <div className="body">
            <h2>Book Your Ticket</h2>
            <form>
                <div className="form-group">
                    <label>From:</label>
                    <input type="text" placeholder="Departure Place" className="input-field" />
                </div>
                <div className="form-group">
                    <label>To:</label>
                    <input type="text" placeholder="Destination" className="input-field" />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" className="input-field" />
                </div>
                <button type="submit" className="search">Search Bus</button>
            </form>
        </div>
    )
}
export default booking