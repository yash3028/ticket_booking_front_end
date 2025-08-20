import React, { useState } from "react";
import { post_request } from "../services/Request";
import "../styles/agentsign.css";
import { Snackbar, Alert } from "@mui/material";
import * as countryCodes from "country-codes-list";

function AgentSign() {
  const [countryCode, setCountryCode] = useState("+91");

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning") => {
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


  const formData = new FormData();
  formData.append("full_name", (form.elements.namedItem("fullName") as HTMLInputElement).value);
  formData.append("mobile", (form.elements.namedItem("mobileNo") as HTMLInputElement).value);
  formData.append("email", (form.elements.namedItem("email") as HTMLInputElement).value);
  formData.append("date_of_birth", (form.elements.namedItem("dob") as HTMLInputElement).value);
  formData.append("password", (form.elements.namedItem("password") as HTMLInputElement).value);
  formData.append("company_name", (form.elements.namedItem("travelName") as HTMLInputElement).value);
  formData.append("userrole", "agent");
  formData.append("country_code", countryCode);
  const fileInput = form.elements.namedItem("logo") as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    formData.append("logo", fileInput.files[0]);
  }

    try {
      await post_request("/api/user/save_user", formData,true);
      showSnackbar("Registration successful!", "success");
      form.reset(); 
    } catch (err) {
      console.error("Registration failed", err);
      showSnackbar("Registration failed. Try again.", "error");
    }
  };  

  return (
    <div className="user-sign">
      <h2>Agent Sign Up</h2>
      <form onSubmit={handleSubmit} className="agent-form-grid">
        <div className="form-row">
          <label>
            Full Name:
            <input type="text" className="input-field" name="fullName" required />
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
            <input type="password" className="input-field" name="password" required />
          </label>
          <label>
            Travel Name:
            <input type="text" className="input-field" name="travelName" required />
          </label>
        </div>

        <div>
          <label>
            Bus Image: 
            <input
              type="file"
              name="logo"
              accept="image/*"
              required
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
        <Alert onClose={handleCloseSnackbar} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AgentSign;
