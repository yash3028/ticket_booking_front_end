import { Requests } from "../models/AgentRequest.model";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { delete_request, get_request } from "../services/Request";

const ResquestsPage = () => {
  const [requests, setRequests] = useState<Requests[]>([]);
  const fetched = useRef(false);
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    (async () => {
      try {
         const res = await get_request("/api/agent/get_request");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    })();

  }, []);

  const handleDelete = async (id: number) => {
    try {
      await delete_request(`/api/agent/delete_request/${id}`);

      setRequests((prev) => prev.filter((req) => req.id !== id));
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
          <button
            onClick={() => {
              setToDeleteId(req.id);
              setConfirmOpen(true);
            }}
          >
            Delete
          </button>
          <Button
            onClick={() =>
              navigate("/agent/edit", { state: { request: req } })
            }
            sx={{ ml: 1 }}
          >
            Edit
          </Button>
        </div>
      ))}

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Delete this request?</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (toDeleteId !== null) {
                handleDelete(toDeleteId);
              }
              setConfirmOpen(false);
              setToDeleteId(null);
            }}
            autoFocus
          >
            Delete
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResquestsPage;
