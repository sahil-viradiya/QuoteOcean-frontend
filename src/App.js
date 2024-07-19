import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Subscribe from "./components/Subscribe";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import Error404 from "./components/Error404";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
