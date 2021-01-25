const https = require('https');
const bodyParser = require("body-parser");
const express = require("express");
const app     = express();
app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/dosyalar"));
app.use(bodyParser.json());


app.get("/",function(req,res){

  var link = "https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=a7ccf39f58624360e151dce17c818ef3";

  https.get(link, function(response){

    console.log("statusCode: ", response.statusCode);

    response.on("data", function(gelenData){

      console.log(gelenData);

      var havaDurumu = JSON.parse(gelenData);



      console.log(havaDurumu);




        res.render("anasayfa", {sehir:havaDurumu});

    })

  });

  });


app.listen(5000);
