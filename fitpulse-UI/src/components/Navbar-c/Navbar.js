import React, { /*Component,*/ useEffect, useState } from "react";
/*import ReactDOM from "react-dom";*/
import logo from "./Images/final_logo.jpg";
import "./navbar.css";
import { Link } from "react-router-dom";
/*import Login from "../Login";*/
import axios from "axios";

export default function Navbar() {
  const [uemail, setUemail] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      await axios
        .get("http://localhost:3007/getcookie", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setUemail(res.data);
        });
    }
    fetchdata();
  });
  function Logout() {
    axios.get("http://localhost:3007/logout", { withCredentials: true });
    window.location.href = "/";
  }

  return (
    <>
      <h3 id="home" /> {/*Linking Navigation*/}
      <div className="navbar">
        <div className="logo-image">
          <img src={logo} alt="" />
        </div>
        <div className="nav-title">
          <p>Fitpulse</p>
        </div>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#exercise">Exercise</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            {/*<a href="#contact">Contact&nbsp;&nbsp;&nbsp;&nbsp;</a>*/}
            <Link to="/contact">Contact&nbsp;&nbsp;&nbsp;&nbsp;</Link>
          </li>
          {uemail != null ? (
            <Link onClick={Logout}>Logout</Link>
          ) : (
            <Link to="/Login" id="nav-login-singup">
              Login/SignUp
            </Link>
          )}

          {/*button type = "button">Login / Sign up</button*/}
        </ul>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}

/*Navigation Bar Starts*/

/*Navigation Bar Ends*/
