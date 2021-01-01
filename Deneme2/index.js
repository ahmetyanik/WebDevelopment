const superheroes = require('superheroes');

const express = require("express");
var app = express();

//   "/" Anasayfaya Baglanma Istegi

app.get("/", function(req,res){

  res.sendFile(__dirname+"/index.html");

});


app.get("/iletisim",function(req,res){

  res.sendFile(__dirname+"/iletisim.html");
});

app.post("/profil",function(req,res){

  res.send("Profiline Hosgeldin. Buraya post islemi ile geldin. Normalde local host ile gelemezsin.")

});


app.get("*",function(req,res){
  res.send("Hata! Lütfen gecerli bir host adresi giriniz!");
})


app.listen(7000);
