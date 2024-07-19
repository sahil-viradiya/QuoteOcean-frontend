import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [userData, setUserData] = useState({});
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate();

  const userContact = async () => {
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
    userContact();
  }, []);

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const { username, email, phone } = userData;

    console.log(username, email, phone, userMessage);

    const res = await fetch("https://quote-ocean-backend.vercel.app/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, email, phone, userMessage }),
    });

    const data = await res.json();

    if (res.status === 201) {
      window.alert(data.message);
      navigate("/");
    } else {
      window.alert("Can't send message");
    }
  };

  return (
    <>
      <div className="main-contact">
        <label className="contact-label">
          <h1>Get in touch</h1>
        </label>
        <div className="contact-box">
          <div className="input-box">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label className="label_input">Name</label>
              <input
                type="text"
                id="username"
                value={userData.username}
                required
              />

              <label className="label_input">Email</label>
              <input type="email" id="email" value={userData.email} required />

              <label className="label_input">Phone</label>
              <input type="tel" id="phone" value={userData.phone} required />

              <label className="label_input">Your Message</label>
              <textarea
                id="message"
                rows="4"
                value={userMessage}
                onChange={handleUserMessage}
                required
              ></textarea>

              <div className="contact-button">
                <button id="btn_contact">Send Message</button>
              </div>
            </form>
          </div>
          <div className="contact-image">
            <img
              src="/contact-us.jpg"
              className="img-fluid-contact"
              alt="Sample"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
