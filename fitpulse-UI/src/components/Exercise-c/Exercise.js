import React from 'react';
import './Exercise.css';

const Exercise = () => {
  return (
    <>
    <h3 id="exercise" />
    <div className="Exercise-title">
        <h1>Our Workout Challenges</h1>
        <h5>Exercise Available at Fit Pulse</h5>
    </div>

    <div className="Exercise-container">
      <div className="box">
        <h2 className="bar">Beginner</h2>
        <br></br>
        <img className='image' src="https://www.muscleandfitness.com/wp-content/uploads/2020/01/Young-Man-Doing-Bicep-Curl-TShirt.jpg?quality=86&strip=all" height="210px" width="210px" alt="" ></img>
        <br></br>
        <br></br>
        <h3 className="text">30 Days Challenge</h3>
        <br></br>
        <button className="button">Start Now!</button>
      </div>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <div className="box">
        <h2 className="bar">Intermediate</h2>
        <br></br>
        <img className='image' src="https://hips.hearstapps.com/hmg-prod/images/dumbbell-workout-royalty-free-image-628023568-1541525265.jpg?resize=1200:*" height="210px" width="210px"  alt=""></img>
        <br></br>
        <br></br>
        <h3 className="text">60 Days Challenge</h3>
        <br></br>
        <button className="button">Start Now!</button>
      </div>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <div className="box">
        <h2 className="bar">Advanced</h2>
        <br></br>
        <img className='image' src="https://cdn.muscleandstrength.com/sites/default/files/field/image/article/best_bicep_exercises_-_400x250.jpg"  height="210px" width="210px" alt=""></img>
        <br></br>
        <br></br>
        <h3 className="text">90 Days Challenge</h3>
        <br></br>
        <button className="button">Start Now!</button>
      </div>
    </div>

    <br></br>
    <br></br>
    <br></br>
    </>
  );
};

export default Exercise;
