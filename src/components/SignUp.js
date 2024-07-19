import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isStrongPassword } from "../utils/passwordUtils";
import { Tooltip } from "react-tooltip";
import "./SignUp.css";

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [isWeakPassword, setIsWeakPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Email validation
    if (name === "email") {
      const isValid = validateEmail(value);
      if (isValid) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    }

    // Only Number is allowed in phone field
    if (name === "phone") {
      if (!/^[0-9]*$/.test(value)) {
        return;
      }
    }

    // Strong password validation
    if (name === "password") {
      validatePassword(value);
    }

    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Strong Password validation
  const validatePassword = (password) => {
    if (!password) {
      return;
    }

    const isWeakPassword = !isStrongPassword(password);

    if (isWeakPassword) {
      setIsWeakPassword(true);
    } else {
      setIsWeakPassword(false);
    }
  };

  // Handling Form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { username, email, phone, password } = signupData;

    const res = await fetch("https://quote-ocean-backend.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, phone, password }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert(data.error);
    } else {
      window.alert("Registration Success");

      navigate("/login");
    }

    setSignupData({
      username: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  return (
    <>
      <div className="main-signup">
        <label className="signup-label">
          <h1>SignUp</h1>
        </label>
        <div className="signup-box">
          <div className="input-box">
            <form className="signup-form" onSubmit={handleSignupSubmit}>
              <label className="label_input">Name</label>
              <input
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleInputChange}
              />

              <label className="label_input">Email</label>
              <input
                type="email"
                className={`${!isEmailValid ? "is-invalid" : ""}`}
                name="email"
                value={signupData.email}
                onChange={handleInputChange}
              />

              <label className="label_input">Phone</label>
              <input
                type="tel"
                name="phone"
                value={signupData.phone}
                onChange={handleInputChange}
              />

              <label className="label_input">Password</label>
              <input
                type="password"
                className={`${isWeakPassword ? "is-invalid" : ""}`}
                name="password"
                value={signupData.password}
                onChange={handleInputChange}
                data-tooltip-id="my-tooltip"
              />

              {/* Tooltip for strong password */}
              <Tooltip id="my-tooltip" place="left" type="dark" effect="solid">
                <p>Password must meet the following conditions:</p>
                <ul>
                  <li>Minimum length: 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </Tooltip>

              <div className="signup-button">
                <button type="submit" id="btn_signup">SignUp</button>
              </div>
            </form>
          </div>
          <div className="signup-image">
            <img
              src="/signup-cool.jpg"
              className="img-fluid-signup"
              alt="Sample"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
