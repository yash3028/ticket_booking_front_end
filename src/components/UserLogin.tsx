import * as React from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { post_request } from "../services/Request";

export default function CustomSignInPage() {
  const navigate = useNavigate();

  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setSnack({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mobile = data.get("mobile") as string;
    const password = data.get("password") as string;

    if (!mobile || !password) {
      showSnackbar("Mobile and Password are required", "warning");
      return;
    }

    const user = {
      mobile,
      password,
      token: null,
      user_role: "User",
    };

    try {
      const response = await post_request("/api/user/login", user);

      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("Authorization", token);
          showSnackbar("Login successful", "success");
          window.dispatchEvent(new Event("authChanged")); 

          setTimeout(() => navigate("/"), 1500);
        } else {
          showSnackbar("Authentication failed, please try again.", "error");
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showSnackbar("Invalid credentials, please sign up", "error");
      } else {
        showSnackbar("An error occurred, please try again later.", "error");
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login In
        </Typography>
        <TextField
          label="Mobile"
          name="mobile"
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "50%" }}
          >
            Log In
          </Button>

          <Link to="/usersign" style={{ width: "50%", textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snack.severity} onClose={handleClose} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
