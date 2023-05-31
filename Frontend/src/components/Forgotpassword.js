import React, { useState }  from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

function Forgotpassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const BASE_URL = "http://localhost:3007";
    const [showOTPField, setShowOTPField] = useState(false);
    const [otpResponse, setOtpResponse] = useState(false);
    const [otp, setOTP] = useState("");
    const [showresetPassword,setrestpassword] = useState(false);

    
  const handleSubmit = (event) => {
    event.preventDefault();
      axios({
        method: 'post',
        url: `${BASE_URL}/forgotpassword`,

         data: {
          email: email,
         }
       })
      .then(
        (response) => {
          console.log(response);
          initiateOTP();
        },
        (error) => {
          alert("Invalid email");
        }
      );
  };
 

  const initiateOTP = (event) => {
    // event.preventDefault();
   
     axios({
       method: 'post',
       url: `${BASE_URL}/sendotplogin`,
       data: {
         emailuser:email,
       }
     }).then(response=>{
       setShowOTPField(true)
       setOtpResponse(response?.data)
     });
   };
 

  const handleVerifyOTP = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: `${BASE_URL}/verifyotplogin`,
      data: {
        otp: otp,
        id : otpResponse?.id
      }
    }).then(response=>{

      setShowOTPField(false)
      setrestpassword(true)
      alert("OTP Verifed, Enter New Password Next")
    }, erro =>{
      alert("Invalid otp")
    });
    //console.log(`OTP: ${otp} verified`);
  };

const handleReset=(event)=>{
 
  axios({
    method: 'post',
    url: `${BASE_URL}/resetpassword`,
    data: {
      email:email,
      password:password,
    }
  }).then(response=>{
    alert("Password Reset Successful")
    window.location.replace("/Login");
  }, erro =>{
    alert("Try again")
  });
};

return (
    <div id="login-body">
      <div className="login-container">
      {!showOTPField && !showresetPassword && <form onSubmit={handleSubmit} id="login-form">
          <h2 id="loginheading">Reset Password</h2>
          <div className="form-group-login">
            <input
              className="input-login"
              type="email"
              id="email-login"
              value={email}
              placeholder="Email id"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Reset
          </button>
          </form>}
        {showOTPField &&<form onSubmit={handleVerifyOTP} className="form-signup">
      
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
        </form>}
        {showresetPassword && <form onSubmit={handleReset} className="form-signup">
      
      <div className="form-groupsignup">
        <input
        className="input-sigup"
          type="password"
          id="otp-signup"
          value={password}
          placeholder="New Password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        
      </div>
      <button type="submit" className="btn-signup">
        Reset
      </button>
    </form>}



      </div>
    </div>
  )
}

export default Forgotpassword