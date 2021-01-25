require('dotenv').config();
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const mongoose   = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds=10;
//var md5 = require('md5');
//const encrypt    = require("mongoose-encryption");

var sifre = 123456;




app.set("view engine", "ejs");
app.use(express.static(__dirname + "/dosyalar"));
app.use(bodyParser.urlencoded( {extended: true} ));


const Schema = mongoose.Schema;
mongoose.connect(process.env.BAGLANTI,{useNewUrlParser:true, useUnifiedTopology:true});



const uyeSemasi = new mongoose.Schema ({
  email : String,
  sifre : String
});



//uyeSemasi.plugin(encrypt, {secret : process.env.ANAHTAR , encryptedFields  : ['sifre'] });




const Kullanici = new mongoose.model("Kullanici", uyeSemasi);
app.get("/", function(req, res){
  res.render("anasayfa");
});
app.get("/kayitol", function(req, res){
  res.render("kayitol");
});
app.post("/kayitol", function(req, res){

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

    const uye = new Kullanici({
      email : req.body.username,
      sifre : hash
    });
    uye.save(function(err){
      if(err)
        console.log(err);
      else
        res.render("gizlisayfa");
    });

  });


})
app.get("/giris", function(req, res){
  res.render("giris");
});
app.post("/girisyap", function(req, res){
  const emailGelen = req.body.username;
  const sifreGelen = req.body.password;
  Kullanici.findOne({email : emailGelen}, function(err, gelenVeri){
    if(err){
      console.log(err);
    }else{
      if(gelenVeri){ // gelen veri var mı

        bcrypt.compare(sifreGelen, gelenVeri.sifre, function(err, result) {
            if(result) // şifreler aynı
              res.render("gizlisayfa");
            else
              res.send("Şifre hatalı");
        });
      }else{
        res.send("Böyle bir kullanıcı yok.");

      }
    }
  });
})
app.listen(5000, function(){
  console.log("5000 port'a bağlandık.");
})
