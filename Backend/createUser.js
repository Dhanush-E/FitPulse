const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: "String",
  mobileNumber: {
    type: Number,
    require: true,
  },
  password: "String",
});


const usermodel = mongoose.model("usermodel", schema);
module.exports = usermodel;
