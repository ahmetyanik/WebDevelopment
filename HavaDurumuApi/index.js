const https = require('https');
const bodyParser = require("body-parser");
const express = require("express");
const app     = express();
app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/dosyalar"));
app.use(bodyParser.json());


app.get("/", function(req, res){
    var link = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=40b46f4fead5a3da313c8caccc44aa5d&lang=tr";


    https.get(link, function(response){
      console.log('statusCode:', response.statusCode);
      response.on("data", function(gelenData){
        console.log(gelenData);

        var havaDurumu = JSON.parse(gelenData);
        console.log(havaDurumu.main.temp);
        console.log(havaDurumu.weather[0].main);


        var durum ="Paris'da hava sicakligi " + (havaDurumu.main.temp-273).toFixed(1) + "'dir ve hava durumu "+ havaDurumu.weather[0].main
        res.send(durum)
      })
    });
});

app.listen(5000);
