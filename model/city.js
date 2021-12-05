const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var $ = require("jquery");
const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition:String,
    conditionPic: String
});

const City = mongoose.model("city", citySchema);

module.exports = City;


