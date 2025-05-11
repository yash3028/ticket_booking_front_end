import * as React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { post_request } from "../services/Request";

export default function AgentLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mobile = data.get("mobile") as string;
    const password = data.get("password") as string;

    if (!mobile || !password) {
      alert("Mobile and Password are required");
      return;
    }

    const user = {
      mobile,
      password,
      token: null,
      user_role: "agent", // Specific to Agent Login
    };

    try {
      const response = await post_request("/api/user/login", user);

      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("authentication", token);
          alert("Login successful");
          navigate("/agenthome"); // Navigate to Agent Home page
        } else {
          alert("Authentication failed, please try again.");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials, please sign up");
        navigate("/agentsign"); // Navigate to Agent Sign-Up page
      } else {
        alert("An error occurred, please try again later.");
      }
    }
  };

  return (
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
        Agent Login
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
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Log In
      </Button>
      <Link to="/agentsign">
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </Link>
    </Box>
  );
}
