import { useEffect, useState } from "react";
import { get_request } from "../services/Request";
import { booking } from "../models/Bookings.model";
import { token } from "../models/Token.model";
import { jwtDecode } from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


function MyBookings() {
  const [tickets, setTickets] = useState<booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackOpen(false);
  };
  

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        showSnackbar("Please log in to view bookings.", "error");
        return;
      }
      const decoded: token = jwtDecode(token);
      const userId = decoded.userId;
      try {
        const res = await get_request(`/api/user/ticket/${userId}`);
        setTickets(res.data);
      } catch (err) {
        showSnackbar("Failed to fetch bookings", "error");
      }
    };

    fetchTickets();
  }, []);

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = tickets.slice(startIndex, startIndex + itemsPerPage);

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="body">
      <h2>My Bookings</h2>
      {tickets.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <>
          {currentTickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "#d32f2f",
                }}
              >
                🚌 {ticket.busId.operator_name} - Bus No: {ticket.busId.bus_no}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ margin: "4px 0" }}>
                  <strong>Route:</strong> {ticket.busId.fromLocation} ➡{" "}
                  {ticket.busId.toLocation}
                </div>
                <div style={{ margin: "4px 0" }}>
                  <strong>Date:</strong> {ticket.busId.departureDate}
                </div>
                <div style={{ margin: "4px 0" }}>
                  <strong>Time:</strong> {ticket.busId.departure_time} -{" "}
                  {ticket.busId.arrival_time}
                </div>
                <div style={{ margin: "4px 0" }}>
                  <strong>Seats Booked:</strong> {ticket.seatsBooked}
                </div>
                <div style={{ margin: "4px 0" }}>
                  <strong>Total Price:</strong> ₹{ticket.totalPrice}
                </div>
                <div style={{ margin: "4px 0" }}>
                  <strong>Booked On:</strong>{" "}
                  {new Date(ticket.createdTime).toLocaleString()}
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              style={{ marginRight: "10px", padding: "5px 12px" }}
            >
              ⬅ Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "10px", padding: "5px 12px" }}
            >
              Next ➡
            </button>
          </div>
        </>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackSeverity}
          elevation={6}
          variant="filled"
        >
          {snackMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default MyBookings;
