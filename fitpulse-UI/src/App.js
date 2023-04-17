import React from 'react';
import { Routes, Route /*, Redirect*/} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
 import Home from './components/Home';
 import BookingPage from './components/BookingPage';
import Contact from './components/contact-c/Contact';
 import Bookingconfirm from './components/Bookingconfirm';
 import Forgotpassword from './components/Forgotpassword';
import About from './components/About-Page/About-Page';
//import Beginner from './components/Beginner/Beginner';
//import Contact from './components/Contact-Page/Contact';
function App() {
  return (
    <Routes>
      
              {/* <Route exact path="/" component={<Login />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/login"  element={<Login />} />
              <Route path="/signup" element={<Signup />} />   
              <Route path="/BookingPage" element={<BookingPage />}/>
              <Route path="/Contact" element={<Contact/>}/>
              <Route path="/Bookingconfirm" element={<Bookingconfirm/>}/>
              <Route path='/Forgotpassword' element={<Forgotpassword/>}/>
              <Route path='/About' element={<About/>}/>
              {/*<Route path='/Beginner' element={<Beginner/>}/>*/}
    </Routes>
  );
}

export default App;
