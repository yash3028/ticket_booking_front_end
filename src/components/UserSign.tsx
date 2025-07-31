import React, { useState } from "react";
import { User } from "../models/User.model";
import { post_request } from "../services/Request";
import "../styles/usersign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import * as countryCodes from "country-codes-list";

function UserSign() {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+91");

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

  const myCountryCodesObject = countryCodes.customList(
      "countryCode",
      "+{countryCallingCode}"
      );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const user: User = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      mobile:   (form.elements.namedItem("mobileNo") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      date_of_birth: new Date(
        (form.elements.namedItem("dob") as HTMLInputElement).value
      ),
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      userrole: "Customer",
      companyName: null,
      token: null,
      country_code: countryCode,
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
      <h2>User Sign Up</h2>
      <form onSubmit={handleSubmit} className="user-form-grid">
        <div className="form-row">
          <label>
            Full Name:
            <input
              type="text"
              className="input-field"
              name="fullName"
              required
            />
          </label>

          <label>
            Mobile No:
            <div className="phone-input-group">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required
                name="countryCode"
              >
                  {Object.values(myCountryCodesObject).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="mobileNo"
                required
                placeholder="Enter mobile number"
                pattern="[0-9]{6,15}"
                title="Enter a valid 10 digit mobile number without country code"
              />
            </div>
          </label>
        </div>

        <div className="form-row">
          <label>
            Email:
            <input type="email" className="input-field" name="email" required />
          </label>
          <label>
            Date of Birth:
            <input type="date" className="input-field" name="dob" required />
          </label>
        </div>

        <div className="form-row">
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
        </div>

        <div className="form-row">
          <button type="submit">Sign Up</button>
        </div>
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
