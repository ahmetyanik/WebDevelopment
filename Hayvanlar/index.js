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
  database : 'hayvanlar'
});

connection.connect(function(err){
  if(err) throw err;
  console.log("MYSQL'e bağlandı..");
});


app.get("/", function(req,res){

  connection.query("SELECT * from hayvanlar; SELECT * from kategoriler ", function(err, results, fields){

    var veriTabaniHayvanlar = results[0];
    var veriTabaniKategoriler= results[1];



  res.render("anasayfa",{
                          hayvanlar:veriTabaniHayvanlar,
                          kategoriler:veriTabaniKategoriler}
            );
});
});

app.get("/hayvanekle", function(req, res){
    res.sendFile(__dirname + "/views/hayvanekle.html");
});

app.post("/veritabanina-ekle"   ,  upload.single('dosya')  ,  function(req, res){
    var resimlinki = "";
    if(req.file){
      resimlinki = "/resimler/"+req.file.filename;
    }
    var hayvanAdi = req.body.hayvanismi;
    var turu     = req.body.turu;
    var anavatani     = req.body.anavatani;
    var aciklama  = req.body.aciklama;


    var sql = "INSERT INTO hayvanlar.hayvanlar (adi, turu, anavatani, aciklama,resimlinki) VALUES('"+hayvanAdi+"','"+ turu+"' ,'"+ anavatani + "','" + aciklama +"', '"+resimlinki+"')";
    connection.query(sql, function(err, results, fields){
      res.redirect("/hayvanekle");
    });
});


app.get("/hayvan/:hayvanAdi/:id", function(req,res){

  var idDegeri = req.params.id-1;

  var sql= "SELECT * from hayvanlar";

  connection.query(sql, function(err, results, fields){

    var idHayvan = idDegeri;
    var hayvanAdi      = results[idDegeri].adi;
    var hayvanTuru   = results[idDegeri].turu;
    var hayvanAnavatani      = results[idDegeri].anavatani;
    var hayvanAciklama   = results[idDegeri].aciklama;
    var hayvanResim = results[idDegeri].resimlinki;
    var sql2 = "SELECT * from kategoriler";

    connection.query(sql,function(err,results,fields){

      res.render("hayvan",{
                              id:idHayvan,
                              adi:hayvanAdi,
                              turu:hayvanTuru,
                              anavatani:hayvanAnavatani,
                              aciklama:hayvanAnavatani,
                              resim:hayvanResim,
                              kategoriler:results




                });


    })





});
});

app.get("/arama",function(req,res){

var arananKelime = req.query.hayvan;

var sql = "SELECT * FROM hayvanlar WHERE adi LIKE '%"+arananKelime+ "%';"

connection.query(sql, function(err, results, fields){

var bulunanHayvanlar = results;

console.log(bulunanHayvanlar);

res.render("arama", {
                      hayvanlar:bulunanHayvanlar
})

})



});

function turleriAl(callback){

  connection.query("SELECT * FROM kategoriler",function(err, results, fields){
    return callback(results);
  });
}


app.get("/turler/:kategorilink",function(req,res){

  turleriAl(function(gelenKategoriler){

  var kategorilink = req.params.kategorilink;
  var sql = "SELECT hayvanlar.hayvanlar.* FROM hayvanlar.hayvanlar LEFT JOIN hayvanlar.kategoriler ON hayvanlar.kategoriler.kategorilink= '"+ kategorilink +"' WHERE hayvanlar.kategoriler.kategori_ismi=hayvanlar.hayvanlar.turu";

  connection.query(sql , function(err , results, fields){
      res.render("turler", {hayvanlar : results , kategoriler : gelenKategoriler} );
  });



});
});





app.listen(8000);
