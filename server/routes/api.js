const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const City = require("../../model/city");
const request = require('request')

mongoose.connect("mongodb://localhost/cityDB", { useNewUrlParser: true });



router.get('/city/:cityName', function (req, res) {
  const cityName = req.params.cityName

  request("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=00938d9d2f51ca8ceb650e7e4c0fbe60", function (error, response, body) {
    let result = JSON.parse(body)
    const newResult = {
      name: result.name,
      temperature: result.main.temp,
      condition: result.weather[0].description,
      conditionPic : result.weather[0].icon
    }
    res.send(newResult)
  })
})




router.get('/cities', function (req, res) {
  City.find({}, function (err, result) {
    res.send(result)
  })
})


router.post('/city', function (req, res) {
  const city = req.body
  City.countDocuments({ name: city.name}, function (err, count){ 
    if(count==0){
        const c1 = new City({ name: city.name, temperature: city.temperature, condition: city.condition, conditionPic: city.conditionPic })
    c1.save()
    res.send(c1)
    }else{
      City.deleteOne({ name: city.name}, function (err) {});
      const c1 = new City({ name: city.name, temperature: city.temperature, condition: city.condition, conditionPic: city.conditionPic })
      c1.save()
      res.send(c1)
}
 
})
})

router.delete('/city/:cityName', function (req, res) {
  City.deleteOne({ name: req.params.cityName }, function (err) {
  });
})

module.exports = router;
/*

const express = require('express')
const router = express.Router()
const City = require('../model/City')
const urllib = require('urllib');

router.get('/city/:cityName', function (req, res) {
    urllib.request(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=2b1e67d568aa1ebd879a6fdd23d8e639&units=metric`, function (err, data, result) {

        const city = JSON.parse(data)

        res.send({
            name: city.name,
            temperature: city.main.temp,
            condition: city.weather[0].main,
            conditionPic: city.weather[0].icon
        })
    });
})

router.get('/cities', async function (req, res) {
    const result = await City.find({})
    res.send(result)
})

router.post('/city', function (req, res) {
    const city = req.body
    City.create({ name: city.name, temperature: city.temperature, condition: city.condition, conditionPic: city.conditionPic })
    res.end()
})


router.delete('/city/:cityName', async function (req, res) {
    await City.find

*/