import React from "react";
import { User } from "../models/User.model";
import { post_request } from "../services/Request";
import "../styles/usersign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserSign() {
  const navigate = useNavigate();

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
        alert("User registered successfully");
        navigate("/login-options");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert("Mobile number already exists");
        } else if (error.response?.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("An error occurred, please try again later.");
        }
      } else {
        alert("An error occurred, please try again later.");
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
    </div>
  );
}

export default UserSign;
