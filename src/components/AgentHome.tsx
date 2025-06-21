import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { get_request, post_request, put_request } from "../services/Request";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "../styles/agenthome.css";
import { Snackbar, Alert } from "@mui/material";

function AgentHome() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const editingId = state?.request?.id ?? null;

  const [cities, setCities] = useState<{ id: number; city_code: string }[]>([]);
  const [departureTime, setDepartureTime] = useState<Dayjs | null>(
    state?.request ? dayjs(`2000-01-01T${state.request.departure_time}`) : dayjs()
  );
  const [arrivalTime, setArrivalTime] = useState<Dayjs | null>(
    state?.request ? dayjs(`2000-01-01T${state.request.arrival_time}`) : dayjs()
  );

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setSnack({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await get_request("/api/master/locations");
        setCities(res.data);
      } catch (err) {
        console.error("Cannot load cities", err);
        showSnackbar("Failed to load cities", "error");
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const details = {
      operator_name: formData.get("name") as string,
      bus_no: formData.get("busNo") as string,
      fromLocation: formData.get("from") as string,
      toLocation: formData.get("to") as string,
      departureDate: formData.get("d_date") as string,
      departure_time: departureTime?.format("HH:mm") ?? "",
      arrival_time: arrivalTime?.format("HH:mm") ?? "",
      seats_available: formData.get("seats") as string,
      price: Number(formData.get("price")),
    };

    try {
      if (editingId) {
        await put_request(`/api/agent/edit/request/${editingId}`, details);
        showSnackbar("Bus details updated!", "success");
      } else {
        await post_request("/api/agent/save_bus", details);
        showSnackbar("Bus added successfully!", "success");
      }
      setTimeout(() => navigate("/agenthome"), 1500);
    } catch (err) {
      console.error("Error submitting form", err);
      showSnackbar("Error submitting form", "error");
    }
  };

  return (
    <div className="agent-home">
      <h2>{editingId ? "Edit Bus Service" : "Add Bus Service"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Operator Name:
          <input
            type="text"
            className="input-field"
            name="name"
            defaultValue={state?.request?.operator_name ?? ""}
            required
          />
        </label>
        <label>
          Bus No:
          <input
            type="text"
            className="input-field"
            name="busNo"
            defaultValue={state?.request?.bus_no ?? ""}
            required
          />
        </label>
        <label>
          From:
          <select
            className="input-field"
            name="from"
            defaultValue={state?.request?.fromLocation ?? ""}
            required
          >
            <option value="">Select From</option>
            {cities.map((c) => (
              <option key={c.id} value={c.city_code}>
                {c.city_code}
              </option>
            ))}
          </select>
        </label>
        <label>
          To:
          <select
            className="input-field"
            name="to"
            defaultValue={state?.request?.toLocation ?? ""}
            required
          >
            <option value="">Select To</option>
            {cities.map((c) => (
              <option key={c.id} value={c.city_code}>
                {c.city_code}
              </option>
            ))}
          </select>
        </label>
        <label>
          Departure Date:
          <input
            type="date"
            className="input-field"
            name="d_date"
            defaultValue={state?.request?.departureDate ?? ""}
            required
          />
        </label>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label>
            Departure Time:
            <MobileTimePicker
              value={departureTime}
              onChange={setDepartureTime}
              ampm={false}
              views={["hours", "minutes"]}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </label>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label>
            Arrival Time:
            <MobileTimePicker
              value={arrivalTime}
              onChange={setArrivalTime}
              ampm={false}
              views={["hours", "minutes"]}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </label>
        </LocalizationProvider>

        <label>
          Seats Available:
          <input
            type="number"
            className="input-field"
            name="seats"
            defaultValue={state?.request?.seats_available ?? ""}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            className="input-field"
            name="price"
            defaultValue={state?.request?.price ?? ""}
            required
          />
        </label>
        <button type="submit">{editingId ? "Update" : "Submit"}</button>
      </form>

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
}

export default AgentHome;
