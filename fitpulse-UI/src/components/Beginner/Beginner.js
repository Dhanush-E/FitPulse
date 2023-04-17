import React from 'react'
import "./Beginner.css";
function Beginner() {
  return (
    
    <>
    <div className='beginner'>
    <center>
        <h1 className='beginner-h1'>Beginner Workout Plans</h1>
    </center>

    <center>
        <h2 className="beginner-h2">The Exercise Available In Our Webiste Are Listed Below</h2>
    </center>

    <div className='beginner-box'>
      <h3>Pushups</h3>
      <h4>Mon,Wed,Fri</h4>
      <iframe width="250" height="200" src="https://www.youtube.com/embed/IODxDxX7oi4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <h5>15 Reps Per Day</h5>
      <p className="beginner-p">Start in a plank position, 
      lower your body by bending your elbows, 
      push yourself back up, and repeat. 
      Keep your body straight, engage your core, 
      keep your elbows close, and breathe. 
      Beginners can start with modified 
      pushups on their knees.</p>
    </div>

    <div className='beginner-box'>
      <h3>Lunges</h3>
      <h4>Tue,Thur,Fri</h4>
      <iframe width="250" height="200" src="https://www.youtube.com/embed/7SMzPn4LGjQ" title="How To do Lunges" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <h5>15 Reps Per Day</h5>
      <p className="beginner-p">Start by standing with your feet 
      hip-width apart. Step forward with 
      one leg, bending both knees until
      they form 90-degree angles. Push 
      off the front foot and return to the
      starting position. Keep your back
      straight, engage your core, and breathe.</p>
    </div>

    <div className='beginner-box'>
      <h3>Brisk Walk</h3>
      <h4>Mon,Wed,Sat</h4>
      <iframe width="250" height="200" src="https://www.youtube.com/embed/nmvVfgrExAg" title="How to do Brisk Walk - Warm Up Exercise" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <h5>15 Min Walk Per Day</h5>
      <p className='beginner-p'>Start by warming up with a few minutes of 
      walking at a slower pace. Then, pick up your pace and walk at a brisk, comfortable speed. Swing your arms, engage your core, take deep breaths, and maintain good posture. At least 30 minutes of brisk walking each day.</p>
    </div>

    <div className='beginner-box'>
      <h3>Planks</h3>
      <h4>Tue,Wed,Sat</h4>
      <iframe width="250" height="200" src="https://www.youtube.com/embed/kL_NJAkCQBg" title="Mastering the Plank - In Just 2 Minutes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <h5>30 Second Per Day</h5>
      <p className='beginner-p'>Start in a plank position, lower your body by bending your elbows, push yourself back up, and repeat. Keep your body straight, engage your core, keep your elbows close, and breathe. Beginners can start with modified pushups on their knees.</p>
    </div>

    <div className='beginner-box'>
      <h3>Squats</h3>
      <h4>Mon,Thur,Fri</h4>
      <iframe width="250" height="200" src="https://www.youtube.com/embed/gsNoPYwWXeM" title="Fix Your Squat (In Just 3-Minutes)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <h5>15 Reps Per Day</h5>
      <p className='beginner-p'>Stand with your feet hip-width apart, push your hips back, and bend your knees until your thighs are parallel to the ground. Back straight, engage your core, and push through your heels to stand back up. Start with bodyweight squats, progress to weighted squats.</p>
    </div>

    <div className='beginner-box'>
      <h3>Jumping Jacks</h3>
      <h4>Tue,Thur,Sat</h4>
      <iframe width="250" height="200" src="https://www.youtube.com/embed/XR0xeuK5zBU" title="How to do Jumping Jacks exercise - Best Cardio Exercises video tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <h5>12 Reps Per Day</h5>
      <p className='beginner-p'>Start by standing with your feet together and your arms at your sides. Then, jump and spread your legs apart while raising your arms above your head. Jump again and return to the starting position.  Focusing on a quick and fluid motion.</p>
    </div>

    <div className='rest-day'>
      <br></br>
      <p>SUNDAY - REST DAY!!!</p>
      <br></br>
      <br></br>
    </div>
    </div>
    </>
  )
}

export default Beginner;
