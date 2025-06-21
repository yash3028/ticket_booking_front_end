import React, { useState } from "react";
import { User } from "../models/User.model";
import { post_request } from "../services/Request";
import "../styles/usersign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

function UserSign() {
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullName = (e.target as HTMLFormElement).elements.namedItem(
      "fullName"
    ) as HTMLInputElement;
    const mobileNo = (e.target as HTMLFormElement).elements.namedItem(
      "mobileNo"
    ) as HTMLInputElement;
    const dob = (e.target as HTMLFormElement).elements.namedItem(
      "dob"
    ) as HTMLInputElement;
    const password = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const email = (e.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement;

    const user: User = {
      fullName: fullName.value,
      email: email.value,
      mobile: mobileNo.value,
      userrole: "Customer",
      companyName: null,
      date_of_birth: new Date(dob.value),
      password: password.value,
      token: null,
    };

    try {
      const response = await post_request("/api/user/save_user", user);
      if (response.status === 200) {
        showSnackbar("User registered successfully", "success");
        setTimeout(() => navigate("/login-options"), 1500);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          showSnackbar("Mobile number already exists", "error");
        } else if (error.response?.status === 401) {
          showSnackbar("Invalid credentials", "error");
        } else {
          showSnackbar("An error occurred, please try again later.", "error");
        }
      } else {
        showSnackbar("An error occurred, please try again later.", "error");
      }
    }
  };

  return (
    <div className="user-sign">
      <h2>User Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" className="input-field" name="fullName" required />
        </label>
        <label>
          Mobile No:
          <input type="text" className="input-field" name="mobileNo" required />
        </label>
        <label>
          Email:
          <input type="text" className="input-field" name="email" required />
        </label>
        <label>
          Date of Birth:
          <input type="date" className="input-field" name="dob" required />
        </label>
        <label>
          Password:
          <input
            type="password"
            className="input-field"
            name="password"
            required
            pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Password must be at least 8 characters, including one uppercase and one lowercase letter."
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>

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
    </div>
  );
}

export default UserSign;
