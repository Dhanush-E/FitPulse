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
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
  //console.log(otp);
  try {
    await postModel.create({ otp, mobileNumber }).then((response) => {
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
        console.log("Validated successfully", otp);
        res.json({ mesg: "Validated successfully" });
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

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
  //console.log(otp);
  try {
    await postModel.create({ otp, mobileNumber }).then((response) => {
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
        console.log("Validated successfully", otp);
        res.json({ mesg: "Validated successfully" });
      } else {
        res.status(400).json({ mesg: "Invalid OTP" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});





//test
app.post("/blockuser", async (req, res) => {
  console.log("block User called");
  const {email} = req.body;
  console.log(email);
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

/*app.post("/checkblockuser",async(req,res)=>{
  const {useremail} = req.body;
  try {
    await blockuser.find({email:useremail}).then((response)=>{
      console.log("i am in await")
      console.log(useremail)
      const nowdate = moment();
      console.log("I am email above")
      console.log( response[0].email)
      const blockeddate =  response[0].blockdate
      const time = nowdate.diff(blockeddate,'hours')
      //console.log(time)
      if(time>4){
        console.log("I am in side 4hrs")
        blockuser.deleteOne({email:"blockdate@gmail.com"})
        res.json({ status: "ok", message: "Successfully deleted the user" });
      }else{
        console.log("I am less than 4 hours")
      }
    },(err)=>{
      console.log("I am the error in try")
    });
  }catch(error){
   //console.log("I am the error in catch")
   res.json({ status: "ok", message: "Successfully deleted the user" });
  }
});*/




app.post("/checkblockuser",async(req,res)=>{
  const {emailuser} = req.body
  try {
    await blockuser.find({ email: emailuser }).then((response) => {
      console.log(response);
      blockuser.deleteOne({email:emailuser});
      res.json({ status: "ok", message: "deleted" });
    },(error) => {
      res.status(400).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
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
  const token = req.cookies;
  res.json(token);
});
app.get("/logout", (req, res) => {
  res.clearCookie("tokens");
  res.send("cookie cleared");
});

app.listen(3007, () => {
  console.log("App listening to 3007");
});
