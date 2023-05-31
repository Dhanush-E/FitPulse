import React, { useState } from "react";
import "./css-files/Signup.css";
import { Link  } from "react-router-dom";
import axios from "axios";


function SignUp() {
  const BASE_URL = "http://localhost:3007";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);
  const [otpResponse, setOtpResponse] = useState(false);
  const [resend,setResend] = useState(1);
  const [count,setCount] = useState(1);



  const [otp, setOTP] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    if (mobile && mobile.length === 10) {
      if (password.length >= 6) {
        if (password === confirmPassword) {
          //verifyemail
          axios({
            method: "post",
            url: `${BASE_URL}/verifydata`,
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
         
        } else {
          alert("Password did not match");
        }
      } else {
        alert("Password Must be atleast 6 characters");
      }
    } else {
      alert("Invalid Mobile No");
    }
  };


  const initiateOTP = (event) => {
    axios({
      method: "post",
      url: `${BASE_URL}/sendotp`,
      data: {
        mobileNumber: mobile,
      },
    }).then((response) => {
      setShowOTPField(true);
      setOtpResponse(response?.data);
    });
  };

  const initiateCreateUser = () => {
    axios({
      method: "post",
      url: `${BASE_URL}/createUser`,
      data: {
        mobileNumber: mobile,
        name: name,
        email: email,
        password: password,
      },
    }).then((response) => {
       alert(`Verified OTP Successfully and User ${name} Created `);
       window.location.replace('/Login') 
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
        initiateCreateUser();
      },
      (erro) => {
      if(erro?.response?.data?.mesg === "OTP expired"){
        setResend(resend+1)
        
        if(resend===3){
          alert("Resend OTP limit reached, Try again later")
          window.location.replace("/Signup")
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
        alert("User Creation failed Due to max otp fails, try agin")
        window.location.replace("/Signup")
      }
    }
      }
    );
  };

  return (
    <div id="signup-body">
      <div className="signup-container">
        {!showOTPField && (
          <form onSubmit={handleSubmit} className="form-signup">
            <h2 id="heading">Sign Up</h2>
            <div className="form-groupsignup">
              <input
                className="input-sigup"
                type="text"
                id="name-signup"
                value={name}
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="form-groupsignup">
              <input
                className="input-sigup"
                type="email"
                id="email-signup"
                value={email}
                placeholder="Email id"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-groupsignup">
              <input
                className="input-sigup"
                type="tel"
                id="mobile-signup"
                value={mobile}
                placeholder="Mobile no"
                onChange={(event) => setMobile(event.target.value)}
                required
              />
            </div>

            <div className="form-groupsignup">
              <input
                className="input-sigup"
                type="password"
                id="password-signup"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="form-groupsignup">
              <input
                className="input-sigup"
                type="password"
                id="confirmPassword-signup"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-signup">
              Sign Up
            </button>
            <p id="loginlink-container">
              Already Registred ?{" "}
              <Link to="/Login" id="login-link">
                Login
              </Link>
            </p>
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
            <br />
            <div>
             
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUp;