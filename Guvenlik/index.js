require('dotenv').config();
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const mongoose   = require("mongoose");
const session    = require("express-session");
const passport   = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

//const bcrypt     = require('bcrypt');
//const saltRounds = 10;
//const md5        = require("md5");
//const encrypt    = require("mongoose-encryption");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static(__dirname + "/dosyalar"));
app.use(session({
  secret: 'Techproeducation - Web Developerlar',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.BAGLANTI, {useNewUrlParser: true , useUnifiedTopology : true});
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;
const uyeSemasi = new mongoose.Schema ({
  username : String,
  sifre : String,
  googleId:String
});
uyeSemasi.plugin(passportLocalMongoose);
uyeSemasi.plugin(findOrCreate);
//uyeSemasi.plugin(encrypt, {secret : process.env.ANAHTAR , encryptedFields  : ['sifre'] });
const Kullanici = new mongoose.model("Kullanici", uyeSemasi);
passport.use(Kullanici.createStrategy());
//*  TARAYICIDA COOKIE OLUŞTURACAĞIZ.         *//
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
//*  TARAYICIDAN ALDIĞIMIZ COOKİ'İ ÇÖZECEĞİZ' *//
passport.deserializeUser(function(id, done) {
  Kullanici.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/hosgeldin",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {

    console.log(profile);

    Kullanici.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



app.get("/", function(req, res){
  if(req.isAuthenticated()){
    res.send("sen daha önceden giriş yapmıştın. o yüzden sana farklı bir sayfa göstereceğim");
  }else{
    res.render("anasayfa");
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/hosgeldin',
    passport.authenticate('google', { failureRedirect: '/girisyap' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.render("gizlisayfa");
    });

app.get("/kayitol", function(req, res){
  res.render("kayitol");
});
app.post("/kayitol", function(req, res){
  Kullanici.register({username: req.body.username}, req.body.password , function(err, gelenVeri){
    if(err){
      console.log(err);
      res.redirect("/kayitol")
    }else{
      passport.authenticate("local")(req,res, function(){
        res.render("gizlisayfa");
      });
    }
  });
  /*bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
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
  });*/
})
app.get("/giris", function(req, res){
  if(req.isAuthenticated()){  // eğer giriş yapılmışsa
    res.render("gizlisayfa");
  }else{
    res.render("giris");
  }
});
app.post("/girisyap", function(req, res){
  const kullanici = new Kullanici({
    username : req.body.username,
    sifre : req.body.password
  });
  req.login(kullanici, function(err){
    if(err)
      console.log(err);
    else
      passport.authenticate("local")(req,res, function(){
        res.render("gizlisayfa");
      })
  })
  /*const emailGelen = req.body.username;
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
  });*/
})
app.get("/cikisyap", function(req, res){
  req.logout();
  res.redirect("/");
});
app.listen(5000, function(){
  console.log("5000 port'a bağlandık.");
})
