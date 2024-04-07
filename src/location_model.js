const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationName:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    contact:{
        type: String,
        required:true
    },
    devices: 
    [{
        type:Object
    }]
})

const Location = mongoose.model('locations', locationSchema);
module.exports = Location;