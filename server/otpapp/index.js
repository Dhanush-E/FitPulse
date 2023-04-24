const express = require("express");
const cors = require("cors");
const app = express();
// const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");
const db = require("./connect");
const postModel = require("./postModel");
const createUser = require("./createUser");
const createBooking = require("./createBooking");
const cookieparser = require("cookie-parser");
//const usermodel = require("./createUser");
const generateOTP = require('my-otp-generator')

//test

const blockuser = require("./blockuser");
const moment = require('moment');
//test

app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //Cross-origin resource sharing 
app.use(cookieparser());

const authToken = "38c2b334a856647b277bb3c453c96db9"; // my Auth Token from www.twilio.com/console
const accountSid = "AC196157eb740751fafd18c37842b2377d"; //deatils of twilio

const client = require("twilio")(accountSid, authToken);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sendOTP = async (otp, mobileNumber) => {
  console.log("inside OTP");
  client.messages
    .create({
      body: `Verify OTP ${otp}`,
      messagingServiceSid: "MG4cbb198c04d07178596a6c5d8a30e7ed",
      to: "+91" + mobileNumber,
    })
    .then((message) => console.log(message.sid));
};

//CURD Operations
app.post("/sendotp", async (req, res) => {
  const { mobileNumber } = req.body;
  const otp =  generateOTP(6)/*otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });*/
  //console.log(otp);
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
app.post("/verifyotp", async (req, res) => {
  const { otp, id } = req.body;
  console.log(otp, id);
  
  try {
    await postModel.findById(id).then((response) => {
      console.log("response", response);
      if (response && response.otp == otp) {
        const nowotptime = moment()
        const time = nowotptime.diff(response.gendate,'minutes',true)
        if(time<2){
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

  const otp =  generateOTP(6) /*otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });*/
  //console.log(otp);
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
        if(time<2){
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





//test
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
//test

app.post("/verifyblock", async (req, res) => {
  const { email } = req.body;
  //console.log(email);
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
    //res.status(400).json({ status: "bad request" });
    res.json({ status: "ok", message: "User not in block collection" });
  }
})

app.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  // const otp = Math.floor(1000 + Math.random() * 9000);
  // console.log(title,otp);
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
  // const otp = Math.floor(1000 + Math.random() * 9000);
  // console.log(title,otp);
  try {
   // await createUser.find({ email: email }).then((response) => {
     // console.log(response);
      //createUser.update({'email':"dhanusheagle2@gmail.com"},{$set:{'password':"resetpassowrd"}})
    //});
    await createUser.updateOne({email:email},{
      $set:{
        password:password
      }
    }).then(
      (response) => {
        res.json({ status: "ok", message: "Password Updated" });
      },
      (err) => {
        res.status(400).json({ status: "bad request" });
      }
    );
  } catch (error) {
   // res.status(500).send(error);
  }
});

app.post("/createUser", async (req, res) => {
  console.log("Create User called");
  const { name, mobileNumber, email, password } = req.body;
  //const verificationotp = Math.floor(100000 + Math.random() * 9000);
  // const isOTPVerfied = false
  // console.log(title,otp);
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

// app.post('/validateotp', async(req,res)=>{
//   const  { mobileNumber , otp} = req.body;
//   // const otp = Math.floor(1000 + Math.random() * 9000);
//   // console.log(title,otp);
//   try {
//      await createUser.find({'mobileNumber' : mobileNumber}).then(response=>{
//       console.log(response);
//       if(response[0].verificationotp == otp){
//         res.json({mesg : 'Validated successfully'})
//       }else{
//         res.json({mesg : 'Invalid OTP'})
//       }
//     })
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // const otp = Math.floor(1000 + Math.random() * 9000);
  // console.log(title,otp);
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
app.post("/verifydata", async (req, res) => {
  const { email /*,mobileNumber*/ } = req.body;
  console.log(email);
  try {
    await createUser.find({ email: email }).then((response) => {
      const list = response.filter((user) => user.email == email);
      console.log("response email", list);
      if (list.length > 0) {
        res.status(400).json({ mesg: "Mail already exists" });
      } else {
        //validateMobileNumber(mobileNumber, res)
        res.json({ status: "ok", message: "Valid mail id" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

/*async function  validateMobileNumber (mobileNumber, res){
  await createUser.find({mobileNumber : mobileNumber}).then(response=>{
    const list = response.filter(user=>user.mobileNumber==mobileNumber)
    console.log('response mobileNumber',list)
    if(list.length > 0){
      res.status(400).json({mesg : 'Mobile Number already exists'})
    }else{
      res.json({status:"ok", message : 'Valid mail id and mobile number'})
    }
  })
}
*/
// app.get('/', async(req,res)=>{
//   try {
//     const posts = await postModel.find();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).send(error)

//   }
// })

// app.get('/:id', async(req,res)=>{
//   const {id} = req.params
// try {
//   const post = await postModel.findById(id);
//   res.json(post);
// } catch (error) {
//   res.status(500).send(error)
// }
// })




app.post("/createBooking", async (req, res) => {
  console.log("Create Booking called");
  const { name, mobileNumber, email, gymlocation, membershipType, startDate } =
    req.body;
  //const verificationotp = Math.floor(100000 + Math.random() * 9000);
  // const isOTPVerfied = false
  // console.log(title,otp);
  //add email verification
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

app.post("/verifydatabooking", async (req, res) => {
  const { email /*,mobileNumber*/ } = req.body;
  console.log(email);
  try {
    await createBooking.find({ email: email }).then((response) => {
      const list = response.filter((booking) => booking.email == email);
      console.log("response email", list);
      if (list.length > 0) {
        res.status(400).json({ mesg: "Booking with this Mail already exists" });
      } else {
        // validateMobileNumberbooking(mobileNumber, res)
        res.json({ status: "ok", message: "Valid mail id" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.post("/blockUser", async (req, res) => {
//   const { email } = req.body;
//   console.log(email);
//   try {
//     await blockedModel.create({ email }).then(
//       (response) => {
//         res.json({ status: "ok", message: "Successfully blocked user" });
//       },
//       (err) => {
//         res.status(400).json({ status: "bad request" });
//       }
//     );
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

/*async function  validateMobileNumberbooking (mobileNumber, res){
  await createBooking.find({mobileNumber : mobileNumber}).then(response=>{
    const list = response.filter(booking=>booking.mobileNumber==mobileNumber)
    console.log('response mobileNumber',list)
    if(list.length > 0){
      res.status(400).json({mesg : 'Booking with this Mobile Number already exists'})
    }else{
      res.json({status:"ok", message : 'Valid mail id and mobile number'})
    }
  })
}*/

app.get("/getcookie", (req, res) => {
  const token = req.cookies.tokens;
  console.log(token);
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
// app.get("/BookingPagelogincheck", auth, (req, res) => {
//   // res.render("BookingPage");

// });
app.listen(3007, () => {
  console.log("App listening to 3007");
});
