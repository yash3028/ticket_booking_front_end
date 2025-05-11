import { useLocation } from "react-router-dom";
import { Bus } from "../models/Bus";
import "../styles/bus.css";

const ResultsPage = () => {
  const location = useLocation();
  const buses: Bus[] = location.state?.buses || [];

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
            <div className="bus-time">
              <p>
                Time:{bus.departure_time} → {bus.arrival_time}
              </p>
            </div>
            <div className="bus-price">
              <p>Price:₹{bus.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
