import { useLocation, useNavigate } from "react-router-dom";
import { Bus } from "../models/Bus";
import "../styles/bus.css";
import { post_request } from "../services/Request";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const buses: Bus[] = location.state?.buses || [];
  const [seatCount, setSeatCount] = useState<{ [busId: number]: number }>({});
  
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnack({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  const handleseats = (busId: number, seats: number) => {
    setSeatCount((prev) => ({
      ...prev,
      [busId]: seats,
    }));
  };

  const book = async (busId: number) => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      showSnackbar("Login to book ticket", "error");
      return;
    }

    const seatsToBook = seatCount[busId] || 1;
    if (seatsToBook <= 0) {
      showSnackbar("Please select at least one seat", "warning");
      return;
    }

    try {
      await post_request("/api/user/book", { busId, seats: seatsToBook });
      showSnackbar("Ticket booked successfully", "success");
    } catch (error) {
      showSnackbar("Failed to book ticket", "error");
    }
  };

  return (
    <div className="results-container">
      <h3 className="results-heading">Available Buses</h3>
      {buses.map((bus, index) => (
        <div className="bus-card" key={index}>
          <div className="bus-info">
            <div className="bus-operator">
              <p>Operator: {bus.operator_name}</p>
            </div>
            <div className="bus-no">
              <p>Bus No: {bus.bus_no}</p>
            </div>
            <div>
              <p>From: {bus.fromLocation}</p>
            </div>
            <div>
              <p>To: {bus.toLocation}</p>
            </div>
            <div className="bus-time">
              <p>
                Time: {bus.departure_time} → {bus.arrival_time}
              </p>
            </div>
            <div className="seats">
              Available Seats: {bus.seats_available}
            </div>
            <div className="book-seats">
              Book Seats:{" "}
              <input
                type="number"
                min="1"
                max={bus.seats_available}
                value={seatCount[bus.id] || 1}
                onChange={(e) =>
                  handleseats(bus.id, parseInt(e.target.value))
                }
              />
            </div>
            <div className="bus-price">
              <p>Price: ₹{bus.price}</p>
            </div>
            <div>
              <button onClick={() => book(bus.id)}>Book</button>
            </div>
          </div>
        </div>
      ))}

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResultsPage;
