import React from "react";
import Navbar from "./Navbar-c/Navbar";
import Slider from "./Slider-c/Slider";
import Service from "./Service-c/Service";
import Exercise from "./Exercise-c/Exercise";
import { About } from "./About-c/About";
import Partner from "./Partner-c/Partner";
import { Footer } from "./Footer-c/Footer";


function Home() {
  const slides = [
    { url: "http://localhost:3000/1.jpeg", title: "image 1" },
    { url: "http://localhost:3000/2.jpeg", title: "image 2" },
    { url: "http://localhost:3000/3.jpeg", title: "image 3" },
    { url: "http://localhost:3000/4.jpeg", title: "image 4" },
    { url: "http://localhost:3000/5.jpeg", title: "image 5" },
  ];

  const containerStyles = {
    width: "100%",
    height: "500px",
    margin: "0 auto",
  };
  return (
    <div className="App">
      <Navbar />

      <div style={containerStyles}>
        <Slider slides={slides} />
      </div>

      <Service />

      <Exercise />

      <About />

      <Partner />

      <Footer />
    </div>
  );
}

export default Home;
