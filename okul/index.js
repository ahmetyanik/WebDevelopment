const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/dosyalar/resimler')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});
var upload = multer({ storage: storage });
const mysql = require("mysql");
const bodyParser = require("body-parser");
const express = require("express");
const app     = express();
app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/dosyalar"));
app.use(bodyParser.json());
var connection = mysql.createConnection({
  multipleStatements : true,
  host     : 'localhost',
  user     : 'root',
  password : '12344321',
  database : 'okul'
});
connection.connect(function(err){
  if(err) throw err;
  console.log("MYSQL'e bağlandı..");
});


app.get("/",function(req,res){

  res.sendFile(__dirname + "/views/anagiris.html");
});

app.get("/ogrencigiris",function(req,res){

  res.sendFile(__dirname + "/views/ogrencigiris.html");
});

app.get("/ogretmengiris",function(req,res){

  res.sendFile(__dirname + "/views/ogretmengiris.html");
});




app.post("/giriskontrol",upload.single('dosya'),function(req,res){

  var adsoyad = req.body.ogrenciadi;
  var numara  = req.body.ogrencinumarasi;
  var sifre   = req.body.ogrencisifresi;

  var sql="SELECT * FROM okul.ogrenciler WHERE adsoyad='"+adsoyad+"' AND ogrencino='"+numara+"'AND sifre='"+sifre+"'";

    connection.query(sql,  function(err, results, fields){
      var bulunanOgrenci=results;
      console.log(bulunanOgrenci);
      console.log(bulunanOgrenci.adsoyad);


      if(bulunanOgrenci.length>0){

        res.render("ogrenci", {ogrenci:bulunanOgrenci});
      }


    });



});

app.post("/ogretmengiriskontrol",upload.single('dosya'),function(req,res){

  var adsoyad = req.body.ogretmenadi;
  var sifre   = req.body.ogretmensifresi;

  var sql="SELECT * FROM okul.ogretmenler WHERE adsoyad='"+adsoyad+"' AND sifre='"+sifre+"'";

    connection.query(sql,  function(err, results, fields){
      var bulunanOgretmen=results;
      console.log(bulunanOgretmen);
      console.log(bulunanOgretmen.adsoyad);


      if(bulunanOgretmen.length>0){

        res.render("ogretmen", {ogretmen:bulunanOgretmen});
      }


    });



});





let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}
app.listen(port, function(){
  console.log("port : " + port);
});
