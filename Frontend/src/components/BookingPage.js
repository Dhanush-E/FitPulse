import React, { useEffect, useState } from "react";
import "./css-files/bookingpage.css";
import axios from "axios";

const BookingPage = () => {
  const BASE_URL = "http://localhost:3007";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [startDate, setStartDate] = useState("");

  const [showOTPField, setShowOTPField] = useState(false);
  const [otpResponse, setOtpResponse] = useState(false);
  const [otp, setOTP] = useState("");
  const [count,setCount] = useState(1);
  const [resend,setResend] = useState(1);
  const [flag,setflag] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here

    axios({
      method: "post",
      url: `${BASE_URL}/verifydatabooking`,
      data: {
        email: email,
      },
    }).then(
      (response) => {
        initiateOTP();
      },
      (erro) => {
        alert(erro?.response?.data?.mesg);
      }
    );


  };

  const initiateOTP = (event) => {
    axios({
      method: "post",
      url: `${BASE_URL}/sendotp`,
      data: {
        mobileNumber: number,
      },
    }).then((response) => {
      setShowOTPField(true);
      setOtpResponse(response?.data);
    });
  };

  const initiateBooking = () => {
    axios({
      method: "post",
      url: `${BASE_URL}/createBooking`,
      data: {
        mobileNumber: number,
        name: name,
        email: email,
        gymlocation: gymLocation,
        membershipType: membershipType,
        startDate: startDate,
      },
    }).then((response) => {
      alert(`Verified OTP Successfully and Booking succesfull `);
      window.location.replace("/Bookingconfirm");
    });
  };

  const handleVerifyOTP = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${BASE_URL}/verifyotp`,
      data: {
        otp: otp,
        id: otpResponse?.id,
      },
    }).then(
      (response) => {
        initiateBooking();
      },
      (erro) => {
        if(erro?.response?.data?.mesg === "OTP expired"){
          setResend(resend+1)
          
          if(resend===3){
            alert("Resend OTP limit reached, Try again later")
            window.location.replace("/BookingPage")
          }else{
            alert("The old OTP is expired new otp will be sent now")
            setCount(1)
            initiateOTP()
          }
        
        }else{
          var stc1 = 3-count;
          var stc = stc1.toString();
          var msg = erro?.response?.data?.mesg.toString();
          var fimsg = msg+" "+stc+" attempts left"
          alert(fimsg);
        setCount(count+1)
        if(count===3){
          alert("Booking failed Due to max otp fails, try agin")
          window.location.replace("/BookingPage")
        }
      }
      }
    );
  };

  //diableing the prs date in calender
  let dateObj = new Date();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");
  let year = dateObj.getFullYear();
  let today = day + "/" + month + "/" + year;
  today = today.toString();
  today = today.slice(6, 10) + "-" + today.slice(3, 5) + "-" + today.slice(0, 2);

 
  useEffect(() => {
    async function fetchdata() {
      await axios
        .get("http://localhost:3007/getcookie", { withCredentials: true })
        .then((response) => {
          if (response.data != null) {
            console.log(response);
          } else {
            window.location.replace("/login");
            if(flag===false){
            alert("Please login to use this feature");}
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setflag(false)
    fetchdata();
  });

  return (
    <div id="booking-container">
      <div id="booking-container-inside">
        {!showOTPField && (
          <form id="form-booking" onSubmit={handleSubmit}>
            <h1 id="gymbookingheading">Pulse Pass</h1>
            <div className="booking-section">
              <input
                type="text"
                name="user_name"
                id="bookingname"
                value={name}
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="booking-section">
              <input
                type="email"
                name="user_email"
                id="bookingemail"
                value={email}
                placeholder="Email id"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="booking-section">
              <input
                type="tel"
                name="user_number"
                id="bookingnumber"
                value={number}
                placeholder="Mobile Number"
                onChange={(event) => setNumber(event.target.value)}
                required
              />
            </div>
            <div className="booking-section">
              <label htmlFor="gymLocation">Gym Location</label>
              <select
                id="gymlocation"
                name="user_gymlocation"
                value={gymLocation}
                onChange={(event) => setGymLocation(event.target.value)}
              >
                <option value="">--Select--</option>
                <option value="Jayanagar">Jayanagar</option>
                <option value="Banashankari">Banashankari</option>
                <option value="BTM Layout">BTM Layout</option>
              </select>
            </div>
            <div className="booking-section">
              <label htmlFor="membershipType">Membership Type</label>
              <select
                id="membershipType"
                name="user_membershiptype"
                value={membershipType}
                onChange={(event) => setMembershipType(event.target.value)}
              >
                <option value="">--Select--</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
            </div>
            <div className="booking-section">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                name="user_startdate"
                id="startDate"
                min={today}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div id="gymbookingbtnsec">
              <button id="gymbookingbtn" type="submit">
                Book Now
              </button>
            </div>
          </form>
        )}
        {showOTPField && (
          <form onSubmit={handleVerifyOTP} className="form-signup">
            <div className="form-groupsignup">
              <input
                className="input-sigup"
                type="text"
                id="otp-signup"
                value={otp}
                placeholder="OTP"
                onChange={(event) => setOTP(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-signup">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
