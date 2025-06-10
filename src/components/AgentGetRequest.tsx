import axios from "axios";
import { Requests } from "../models/AgentRequest.model";
import { useEffect, useRef, useState } from "react";

const ResquestsPage = () => {
  const [requests, setRequests] = useState<Requests[]>([]);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    const controller = new AbortController();

    (async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const res = await axios.get("/api/agent/get_request", {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => controller.abort();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("Authorization");
      await axios.delete(`/api/agent/delete_request/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="results-container">
      <h3 className="results-heading">Requested Buses</h3>
      {requests.map((req, index) => (
        <div className="bus-card" key={req.id ?? index}>
          <div className="bus-info">
            <p>Operator: {req.operator_name}</p>
            <p>Bus No: {req.bus_no}</p>
            <p>Route: {req.fromLocation} → {req.toLocation}</p>
            <p>Date: {req.departureDate}</p>
            <p>Time: {req.departure_time} → {req.arrival_time}</p>
            <p>Seats Available: {req.seats_available}</p>
            <p>Price: ₹{req.price}</p>
          </div>
          <button onClick={() => handleDelete(req.id!)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ResquestsPage;
