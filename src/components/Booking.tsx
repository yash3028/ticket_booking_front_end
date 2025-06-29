import "../styles/booking.css";
import CitiesList from "./Searchable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Booking() {
  const navigate = useNavigate();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error" | "info" | "warning">("info");

  const goto = () => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      setSnackMessage("Please log in to view your bookings.");
      setSnackSeverity("warning");
      setSnackOpen(true);
      return;
    }
    navigate("/my-bookings");
  };

  const handleCloseSnackbar = () => {
    setSnackOpen(false);
  };

  return (
    <div className="body">
      <div>
        <button onClick={goto}>My booking</button>
      </div>
      <h2>Book Your Ticket</h2>
      <CitiesList />

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackSeverity} elevation={6} variant="filled">
          {snackMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Booking;
