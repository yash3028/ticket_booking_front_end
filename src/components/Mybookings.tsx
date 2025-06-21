import { useEffect, useState } from "react";
import { get_request } from "../services/Request";
import { booking } from "../models/Bookings.model";
import { token } from "../models/Token.model";
import {jwtDecode } from "jwt-decode";

function MyBookings() {
  const [tickets, setTickets] = useState<booking[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        alert("Please log in to view bookings.");
        return;
      }
      const decoded: token = jwtDecode(token)
      const userId = decoded.userId;
      console.log(userId)
      try {
        const res = await get_request(`/api/user/ticket/${userId}`);
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="body">
      <h2>My Bookings</h2>
      {tickets.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <p><strong>Operator:</strong> {ticket.busId.operator_name}</p>
            <p><strong>Bus No:</strong> {ticket.busId.bus_no}</p>
            <p><strong>Route:</strong> {ticket.busId.fromLocation} ➡ {ticket.busId.toLocation}</p>
            <p><strong>Date:</strong> {ticket.busId.departureDate}</p>
            <p><strong>Time:</strong> {ticket.busId.departure_time} - {ticket.busId.arrival_time}</p>
            <p><strong>Seats Booked:</strong> {ticket.seatsBooked}</p>
            <p><strong>Total Price:</strong> ₹{ticket.totalPrice}</p>
            <p><strong>Booked On:</strong> {new Date(ticket.createdTime).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;