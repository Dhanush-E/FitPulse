const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./connect");
const postModel = require("./postModel");
const createUser = require("./createUser");
const createBooking = require("./createBooking");
const cookieparser = require("cookie-parser");
const generateOTP = require('my-otp-generator')
const blockuser = require("./blockuser");
const moment = require('moment');

app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //Cross-origin resource sharing 
app.use(cookieparser());

const authToken = "twilo auth token"
const accountSid = "twilo account sid"

const client = require("twilio")(accountSid, authToken);

//twilio api code for otp sending 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sendOTP = async (otp, mobileNumber) => {
  console.log("inside OTP");
  client.messages
    .create({
      body: `Verify OTP ${otp}`,
      messagingServiceSid: "twilo msg sid",
      to: "+91" + mobileNumber,
    })
    .then((message) => console.log(message.sid));
};

//otp sending endpoint for signup
app.post("/sendotp", async (req, res) => {
  const { mobileNumber } = req.body;
  const otp =  generateOTP(6)
  const  gendate = moment()
  console.log(gendate)
  try {
    await postModel.create({ otp, mobileNumber, gendate }).then((response) => {
      sendOTP(otp, mobileNumber);
      res.json({ mesg: "OTP sent successfully", id: response.id });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//otp verfication end point
app.post("/verifyotp", async (req, res) => {
  const { otp, id } = req.body;
  console.log(otp, id);
  
  try {
    await postModel.findById(id).then((response) => {
      console.log("response", response);
      if (response && response.otp == otp) {
        const nowotptime = moment()
        const time = nowotptime.diff(response.gendate,'minutes',true)
        if(time<1){
          console.log("Validated successfully", otp);
          res.json({ mesg: "Validated successfully" });
        }else{
          res.status(400).json({ mesg: "OTP expired" });
        }
       
      } else {
        res.status(400).json({ mesg: "Invalid OTP" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/sendotplogin", async (req, res) => {
  const { emailuser } = req.body;
  try {
    await createUser.find({ email: emailuser }).then((response) => {
      console.log(response);
      mobileNumber = response[0].mobileNumber;
    });
  } catch (error) {
    res.status(500).send(error);
  }

  const otp =  generateOTP(6)
  const gendate = moment()
  console.log(gendate)
  try {
    await postModel.create({otp,mobileNumber,gendate}).then((response) => {
      sendOTP(otp, mobileNumber);

      res.json({ mesg: "OTP sent successfully", id: response.id });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/verifyotplogin", async (req, res) => {
  const { otp, id } = req.body;
  console.log(otp, id);
  try {
    await postModel.findById(id).then((response) => {
      console.log("response", response);
      if (response && response.otp == otp) {
        const nowotptime = moment()
        const time = nowotptime.diff(response.gendate,'minutes',true)
        console.log(time)
        if(time<1){
          console.log("Validated successfully", otp);
          res.json({ mesg: "Validated successfully" });
        }else{
          res.status(400).json({ mesg: "OTP expired" });
        }
       
      } else {
        res.status(400).json({ mesg: "Invalid OTP" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


//updating user block time if user mail id alreadry in block list
app.post("/updateblocktime", async (req, res) => {
  const { email} = req.body;
  time = moment()
  try {
    await blockuser.updateOne({email:email},{
      $set:{
        blockdate:time
      }
    }).then(
      (response) => {
        res.json({ status: "ok", message: "Time Updated" });
      },
      (err) => {
        res.status(400).json({ status: "bad request" });
      }
    );
  } catch (error) {
   // res.status(500).send(error);
  }
});





//add block email to db
app.post("/blockuser", async (req, res) => {
  console.log("block User called");
  const {email} = req.body;
  const blockdate = moment();
  try {
    await blockuser.create({email,blockdate}).then(
      (response) => {
        res.json({ status: "ok", message: "Successfully blocked user" });
      },
      (err) => {
        res.status(400).json({ status: "bad request" });
      }
    );
  } catch (error) {
    //  res.status(500).send(error);
  }
});


//checking if email in blockdb
app.post("/verifyblock", async (req, res) => {
  const { email } = req.body;
  try {
    await blockuser.find({ email: email }).then((response) => {
      const list = response.filter((user) => user.email == email);
      console.log("response email", list);
      if (list.length > 0) {
        res.status(400).json({ mesg: "Mail already exists" });
      } else {
        res.json({ status: "ok", message: "new block" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});




//check if the block time of user is completed or not
app.post("/checkblock",async(req,res)=>{
  const {email} = req.body;
  try{
    await blockuser.find({email:email}).then((response)=>{
      const nowdate = moment();
      const time = nowdate.diff(response[0].blockdate,'hours',true)
      console.log(time)
      if(time>4){
        res.json({ status: "ok", message: "user block time is completed" });
      }else{
        res.status(400).json({ status: "bad request" });
      }
     
    },(error)=>{
      res.status(400).json({ status: "bad request" });
    })
  
  }catch{
    res.json({ status: "ok", message: "User not in block collection" });
  }
})

//forgot password end point to check email in db 
app.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    await createUser.find({ email: email }).then((response) => {
      console.log(response);
      if (response[0].email == email) {
        res.json({ status: "ok", message: "valid email" });
      } else {
        res.status(401).send({ mesg: "Invalid email Id" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/resetpassword", async (req, res) => {
  const { email, password } = req.body;
  try {
    await createUser.updateOne({email:email},{
      $set:{
        password:password
      }
    }).then(
      (response) => {
        console.log("I am inside Password");
        res.json({ status: "ok", message: "Password Updated" });
      },
      (erro) => {
        res.status(400).json({ status: "bad request" });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});


//sign up - creation of the user in the db
app.post("/createUser", async (req, res) => {
  console.log("Create User called");
  const { name, mobileNumber, email, password } = req.body;
  try {
    await createUser.create({ name, email, mobileNumber, password }).then(
      (response) => {
        res.json({ status: "ok", message: "Successfully created user" });
      },
      (err) => {
        res.status(400).json({ status: "bad request" });
      }
    );
  } catch (error) {
    //  res.status(500).send(error);
  }
});


//user login end point
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await createUser.find({ email: email }).then((response) => {
      console.log(response);
      if (response[0].email == email && response[0].password == password) {
        const data = {
          time: Date(),
          mailID: email,
          password,
        };

        console.log("im here");
        res.cookie("tokens", email).json("ok");
      } else {
        res.status(401).send({ mesg: "Invalid email Id or password" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//check if email id alreadry exists in DB
app.post("/verifydata", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    await createUser.find({ email: email }).then((response) => {
      const list = response.filter((user) => user.email == email);
      console.log("response email", list);
      if (list.length > 0) {
        res.status(400).json({ mesg: "Mail already exists" });
      } else {
        res.json({ status: "ok", message: "Valid mail id" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//membership booking
app.post("/createBooking", async (req, res) => {
  console.log("Create Booking called");
  const { name, mobileNumber, email, gymlocation, membershipType, startDate } =
    req.body;
  try {
    await createBooking
      .create({
        name,
        email,
        mobileNumber,
        gymlocation,
        membershipType,
        startDate,
      })
      .then(
        (response) => {
          res.json({ status: "ok", message: "Successfully created Booking" });
        },
        (err) => {
          res.status(400).json({ status: "bad request" });
        }
      );
  } catch (error) {
    //  res.status(500).send(error);
  }
});


//check if booking already exists with email
app.post("/verifydatabooking", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    await createBooking.find({ email: email }).then((response) => {
      const list = response.filter((booking) => booking.email == email);
      console.log("response email", list);
      if (list.length > 0) {
        res.status(400).json({ mesg: "Booking with this Mail already exists" });
      } else {
        res.json({ status: "ok", message: "Valid mail id" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/getcookie", (req, res) => {
  const token = req.cookies.tokens;
  if (token != null) {
    res.json(token);
  } else {
    res.json(null); 
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("tokens");
  res.send("cookie cleared");
});

app.listen(3007, () => {
  console.log("App listening to 3007");
});
