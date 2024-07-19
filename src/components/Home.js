import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [quote, setQuote] = useState("Your Generated Quote Here");
  const [author, setAuthor] = useState("Author Name");

  const generateQuote = async () => {
    const res = await fetch("https://api.quotable.io/quotes/random", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data) {
      setQuote(data[0].content);
      setAuthor(data[0].author);
    }
  };

  useEffect(() => {
    generateQuote();
  }, []);

  return (
    <>
      <div className="main">
        <label className="quote-label">
          <h1>Generate Your Quote !</h1>
        </label>
        <div className="quote-box">
          <div className="quote">
            <p>
              <span style={{ fontSize: "2rem" }}>{'"'}</span>
              {quote}
              <span style={{ fontSize: "2rem" }}>{'"'}</span>
            </p>
          </div>
          <div className="quote-author">~ {author}</div>
        </div>
        <div className="quote-buttons">
          <button id="btn_generate" onClick={generateQuote}>
            Generate
          </button>
          <button id="btn_subscribe">
            <Link to="/subscribe" className="subscribe-link">
              Subscribe
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
