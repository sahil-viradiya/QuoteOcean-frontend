import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    const res = await fetch("https://quote-ocean-backend.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      window.alert("Login Success");
      console.log("Login Success");

      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="main-login">
        <label className="login-label">
          <h1>Login</h1>
        </label>
        <div className="login-box">
          <div className="input-box">
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <label className="label_input_login">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={handleEmailChange}
              />

              <label className="label_input_login">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={handlePasswordChange}
              />
              <div className="login-button">
                <button id="btn_login">Login</button>
              </div>
            </form>
          </div>
          <div className="login-image">
            <img
              src="/login-cool.jpg"
              className="img-fluid"
              alt="Sample"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
