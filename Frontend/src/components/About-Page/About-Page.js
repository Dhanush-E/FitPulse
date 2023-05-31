import React, { Component } from "react";
import dhanush from "./Images/dhanush.jpg";
import sid from "./Images/Sid.jpg";
import thrupthi from "./Images/thrupthi.jpg";
import sujay from "./Images/sujay.jpg";
import devaraj from "./Images/devaraj.jpg";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./about-page.css";
import ScrollToTop from "../../ScrollToTop";
function About(){
   
    return (
      <>
        <div className="about-page">
        <ScrollToTop />
          <div className="about">

            <div className="about-section">
              <h1>About Us</h1>
              <h5>
                Unleash <span> Your Potential </span>
              </h5>
              <br></br>
              <p>
              Welcome to Fit Pulse, your one-stop destination for all your fitness needs. We are a chain of gym outlets located in Bangalore, with branches in BTM Layout, Banashankari, and Jayanagar. Our mission is to help you achieve your fitness goals by providing a safe and effective workout environment, along with expert guidance and support.
              <br></br>
              At Fit Pulse, we believe that fitness is a journey, not a destination. That's why we offer a range of workout options to suit your needs, whether you're a beginner, intermediate, or pro. Our website features a comprehensive workout guide, with full-body workouts for all levels, designed to help you achieve your fitness goals.
              <br></br>
              Booking a slot at any of our gym outlets is easy and convenient, and can only be done through our website. We offer three different membership options - 3 months, 6 months, and 12 months - to suit your individual needs and preferences. Once you've booked your membership online, simply visit the gym outlet to complete the payment and start your fitness journey with us.
              <br></br>
              At Fit Pulse, we believe that fitness is not just about working out - it's about creating a lifestyle that promotes wellness and health. Our expert trainers are dedicated to helping you achieve your goals, whether you're looking to lose weight, build muscle, or simply improve your overall health and wellbeing. With our personalized training programs, you can be sure that you're getting the guidance and support you need to succeed.
              <br></br>
              We understand that starting a fitness journey can be overwhelming, which is why we've created a supportive and inclusive community at Fit Pulse. Our team of trainers and staff are here to answer your questions and provide you with the support you need to succeed. Whether you're a fitness enthusiast or a first-time gym-goer, we're here to help you achieve your goals and transform your life.
              <br></br>
              Thank you for choosing Fit Pulse as your partner in fitness. We look forward to helping you achieve your fitness goals and creating a healthier, happier you. If you have any questions or concerns, please don't hesitate to contact us through our website.
              </p>
            </div>

            <div className="about-founders">

              <div className="about-row">
                <div className="founder">
                  <div className="about-page">
                    <img src={dhanush} alt="" />
                  </div>
                  <h1>Dhanush E</h1>
                  <h3>20191CSE0126</h3>
                  <div className="icons">
                  <a href="https://www.linkedin.com/in/dhanush-e-5092761a1">
                    <FaLinkedin className="founder-icon" />
                  </a>{" "}
                  <a href="https://github.com/Dhanush-E">
                    <FaGithub className="founder-icon" />
                  </a>{" "}
                  </div>
                </div>
              </div>

              <div className="about-row">
                <div className="founder">
                  <div className="about-page">
                    <img src={sid} alt="" />
                  </div>
                  <h1>Sai Dhanush</h1>
                  <h3>20191CSE0781</h3>
                  <div className="icons">
                  <a href="https://www.linkedin.com/in/soma-sai-dhanush-a6a2a11a3/">
                    <FaLinkedin className="founder-icon" />
                  </a>{" "}
                  <a href="https://github.com/Ssdsai">
                    <FaGithub className="founder-icon" />
                  </a>{" "}
                  </div>
                </div>
              </div>

              <div className="about-row">
                <div className="founder">
                  <div className="about-page">
                    <img src={thrupthi} alt="" />
                  </div>
                  <h1>Thrupthi V</h1>
                  <h3>20191ISE0183</h3>
                  <div className="icons">
                  <a href="https://www.linkedin.com/in/thrupthi">
                    <FaLinkedin className="founder-icon" />
                  </a>{" "}
                  <a href="https://github.com/Thrupthi15">
                    <FaGithub className="founder-icon" />
                  </a>{" "}
                  </div>
                </div>
              </div>

              <div className="about-row">
                <div className="founder">
                  <div className="about-page">
                    <img src={sujay} alt="" />
                  </div>
                  <h1>Sujay P V</h1>
                  <h3>20191CSE0595</h3>
                  <div className="icons">
                  <a href="https://www.linkedin.com/in/sujay-p-v-623b981b5">
                    <FaLinkedin className="founder-icon" />
                  </a>{" "}
                  <a href="https://github.com/Sujay-pv">
                    <FaGithub className="founder-icon" />
                  </a>{" "}
                  </div>
                </div>
              </div>

              <div className="about-row">
                <div className="founder">
                  <div className="about-page">
                    <img src={devaraj} alt="" />
                  </div>
                  <h1>Devaraja</h1>
                  <h3>20191CSE0124</h3>
                  <div className="icons">
                  <a href="https://www.linkedin.com/in/devaraja-n-551294230">
                    <FaLinkedin className="founder-icon" />
                  </a>{" "}
                  <a href="https://github.com/Devarja">
                    <FaGithub className="founder-icon" />
                  </a>{" "}
                  </div>
                </div>
              </div>

            </div>
            </div>
          </div>
      </>
    );
  }
export default About;