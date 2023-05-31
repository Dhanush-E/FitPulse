import React, { Component } from "react";
/*import ReactDOM from "react-dom";*/
import aboutimage from "./Images/final_logo.jpg";
import { Link/*, redirect */} from 'react-router-dom';

import "./about.css";

export class About extends Component 
{
  render() 
  {
    return (
        <>
        <h3 id="about" />
        <section className = "about">
        <div className="main">
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
            <br></br>
            <div className='about-image'>
                <img src={aboutimage} alt=''/>
            </div>
            <div className='about-text'>
                <h1>About Us</h1>
                <h5>Unleash <span> Your Potential </span></h5>
                <p>Fitpulse, where we believe that fitness is for everyone. Our mission is to provide accessible, evidence-based information and resources to help individuals of all fitness levels achieve their health and wellness goals.
Our team of certified fitness experts and nutritionists have years of experience helping people transform their bodies and their lives through exercise and healthy eating. We believe that fitness is not just about achieving a certain body shape or size, but about feeling strong, confident, and empowered to live life to the fullest.
</p>
           <Link to='/About'> <button type = "button">Read More</button></Link>
            </div>
        </div>
        </section>
        <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </>
    );
  }
}

/*Navigation Bar Starts*/

/*Navigation Bar Ends*/

/*-----------------------   Footer Section Starts     -----------------------*/
