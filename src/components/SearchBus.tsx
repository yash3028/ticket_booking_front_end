import { useLocation } from "react-router-dom";
import { Bus } from "../models/Bus";
import "../styles/bus.css";
import { post_request } from "../services/Request";
import { useState } from "react";
import { Snackbar, Alert, Button, Grid,Typography, Paper, Box, TextField, Avatar } from "@mui/material";

const ResultsPage = () => {
  const location = useLocation();
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
    <Box className="results-container" sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mt:6, textAlign: "center" }}>
        Available Buses
      </Typography>

      {buses.map((bus, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            width: "100%",     
            maxWidth: "100%",  
            mx: "auto",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2} sx={{ textAlign: "center" }}>
              <Avatar
                src={`http://localhost:8080/api/agent/${bus.aid}/logo`}
                variant="square"
                sx={{
                  width: { xs: 100, sm: 120, md: 150 }, 
                  height: { xs: 60, sm: 80, md: 100 },  
                  margin: "auto",
                  borderRadius: 2, 
                  objectFit: "contain",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" >
                Operator Name: {bus.operator_name}
              </Typography>
              <Typography variant="body2">Bus No: {bus.bus_no}</Typography>
              <Typography variant="body2">
                {bus.fromLocation} → {bus.toLocation}
              </Typography>
              <Typography variant="body2">
                Time: {bus.departure_time} → {bus.arrival_time}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant="body2">
                Seats Available: {bus.seats_available}
              </Typography>
              <TextField
                label="Book Seats"
                type="number"
                size="small"
                inputProps={{ min: 1, max: bus.seats_available }}
                value={seatCount[bus.id] || 1}
                onChange={(e) =>
                  handleseats(bus.id, parseInt(e.target.value, 10))
                }
                sx={{ mt: 1, width: "100px" }}
              />
              <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                Price: ₹{bus.price}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => book(bus.id)}
                fullWidth
              >
                Book
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}

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
};

export default ResultsPage;
