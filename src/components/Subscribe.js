import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Subscribe.css";

const Subscribe = () => {
  const [userData, setUserData] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();

  // This function checks whether user is logged in or not.
  const callSubscribePage = async () => {
    try {
      const res = await fetch(
        "https://quote-ocean-backend.vercel.app/getdata",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      setUserData(data);

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }

      if (!res.status === 200) {
        const err = new Error(res.err);
        throw err;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callSubscribePage();
  }, []);

  const handleTimeSelection = (e) => {
    setSelectedTime(e.target.value);
  };

  // This function sends input data to backend
  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();

    const emailReceivingTime = selectedTime;
    const email = userData.email;
    const subscribed = true;

    const res = await fetch(
      "https://quote-ocean-backend.vercel.app/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ emailReceivingTime, email, subscribed }),
      }
    );

    const data = await res.json();

    if (res.status === 201) {
      window.alert(data.message);
      navigate("/");
    } else {
      console.log("error !!");
    }
  };

  return (
    <>
      <div className="main-subscribe">
        <label className="subscribe-label">
          <h1>Subscribe</h1>
        </label>
        <div className="subscribe-box">
          <div className="input-box">
            <form className="subscribe-form" onSubmit={handleSubscribeSubmit}>
              <label className="label_input">Select Time</label>
              <input
                type="time"
                id="appt"
                name="appt"
                onChange={handleTimeSelection}
                required
              />

              <label className="label_input">Your Email</label>
              <input type="email" id="email" value={userData.email} disabled />

              <div className="subscribe-button">
                <button type="submit" id="btn_subscribe">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="subscribe-image">
            <img
              src="/subscribe.jpg"
              className="img-fluid-subscribe"
              alt="Sample"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
