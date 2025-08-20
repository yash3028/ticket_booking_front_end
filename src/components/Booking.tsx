import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import CitiesList from "./Searchable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, sm: 4, md: 6 }, 
        py: { xs: 3, sm: 4 },
      }}
    >
      <Box sx={{ alignSelf: "center", mb: 0.8 }}>
        <Button
          variant="contained"
          onClick={goto}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            px: { xs: 2.5, sm: 3 },
            py: { xs: 1, sm: 1.2 },
          }}
        >
          My Booking
        </Button>
      </Box>

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          textAlign: "start",
        }}
      >
        Book Your Ticket
      </Typography>

      <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: "600px" }, mt: 0 }}>
        <CitiesList />
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackSeverity}
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Booking;
