
import "../styles/booking.css";
import CitiesList from "./Searchable";
import { useNavigate } from "react-router-dom";
function Booking() {

    const navigate = useNavigate()
    const goto = () =>{
      const token = localStorage.getItem("Authorization");
      if(!token){
        alert("login ")
        return;
      }
      navigate("/my-bookings")
  }
  return (
    <div className="body">
      <div>
        <button onClick={goto}>My booking</button>
      </div>
      <h2>Book Your Ticket</h2>
      <CitiesList />
    </div>
  );
}

export default Booking;
