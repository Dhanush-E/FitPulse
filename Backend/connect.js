const mongoose = require('mongoose');
const uri = 'mongodb+srv://dhanusheagle2:b6xj5RU6fD9g40gZ@cluster0.ogwvpfm.mongodb.net/fitpulsedb?retryWrites=true&w=majority'
const connection = mongoose.connect(uri).then(()=>console.log('connected to DB')).catch(err=> console.log(err))




module.exports = connection