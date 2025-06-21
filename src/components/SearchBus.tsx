import { useLocation, useNavigate } from "react-router-dom";
import { Bus } from "../models/Bus";
import "../styles/bus.css";
import { post_request } from "../services/Request";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const buses: Bus[] = location.state?.buses || [];

 const book = async(busId: number)=>{
  const token = localStorage.getItem("Authorization")
  if(!token){
    alert("login to book ticket")
    return;
  }

  try{
    await post_request("/api/user/book",{busId});
    alert("ticket booked")
  }catch(error){
    alert("failed")
  }

 }

  return (
    <div className="results-container">
      <h3 className="results-heading">Available Buses</h3>
      {buses.map((bus, index) => (
        <div className="bus-card" key={index}>
          <div className="bus-info">
            <div className="bus-operator">
              <p>Operator:{bus.operator_name}</p>
            </div>
            <div className="bus-no">
              <p>Bus No:{bus.bus_no}</p>
            </div>
            <div>
                <p>From:{bus.fromLocation}</p>
            </div>
            <div>
              <p>To:{bus.toLocation}</p>
            </div>
            <div className="bus-time">
              <p>
                Time:{bus.departure_time} → {bus.arrival_time}
              </p>
            </div>
            
            <div className="bus-price">
              <p>Price:₹{bus.price}</p>
            </div>
            <div>
              <button onClick={()=>book(bus.id)}>Book</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
