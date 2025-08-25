import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { get_request, post_request, put_request } from "../services/Request";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "../styles/agenthome.css";
import { Snackbar, Alert, Box, Grid, Button, MenuItem, TextField, Typography } from "@mui/material";

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
     <Box>
      <Typography variant="h5" gutterBottom>
        {editingId ? "Edit Bus Service" : "Add Bus Service"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              label="Operator Name"
              name="name"
              fullWidth
              required
              defaultValue={state?.request?.operator_name ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              label="Bus No"
              name="busNo"
              fullWidth
              required
              defaultValue={state?.request?.bus_no ?? ""}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              select
              label="From"
              name="from"
              fullWidth
              required
              defaultValue={state?.request?.fromLocation ?? ""}
            >
              <MenuItem value="">Select From</MenuItem>
              {cities.map((c) => (
                <MenuItem key={c.id} value={c.city_code}>
                  {c.city_code}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              select
              label="To"
              name="to"
              fullWidth
              required
              defaultValue={state?.request?.toLocation ?? ""}
            >
              <MenuItem value="">Select To</MenuItem>
              {cities.map((c) => (
                <MenuItem key={c.id} value={c.city_code}>
                  {c.city_code}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              label="Departure Date"
              type="date"
              name="d_date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              defaultValue={state?.request?.departureDate ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Departure Time"
                value={departureTime}
                onChange={setDepartureTime}
                ampm={false}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Arrival Time"
                value={arrivalTime}
                onChange={setArrivalTime}
                ampm={false}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              label="Seats Available"
              type="number"
              name="seats"
              fullWidth
              required
              defaultValue={state?.request?.seats_available ?? ""}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              label="Price"
              type="number"
              name="price"
              fullWidth
              required
              defaultValue={state?.request?.price ?? ""}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent= "center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ px: { xs: 4, sm: 6, md: 8 } }} 

            >
              {editingId ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AgentHome;
