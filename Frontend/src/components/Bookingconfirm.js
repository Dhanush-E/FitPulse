import React from 'react'
import "./css-files/bookingconfirm.css";
import { Link } from 'react-router-dom';

function Bookingconfirm() {
  return (
    <div id="bc-body">
    <div id="bookingconfirm-container">
        <h3 id="bc-ty">Your Booking is Confirmed</h3>
        <br />
        <h4 id="bc-msg">Thank you</h4>
        <div id="bc-gh-div">
        <Link to="/"> <button type="submit" id="btn-bcpage">
           Go Back to Home
          </button></Link> 
          </div>
    </div>
    </div>
  )
}

export default Bookingconfirm