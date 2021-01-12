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

  connection.query("SELECT * from hayvanlar; ", function(err, results, fields){

    var veriTabaniHayvanlar = results;

    console.log(veriTabaniHayvanlar);

  res.render("anasayfa",{
                          hayvanlar:veriTabaniHayvanlar}
            );
});
});


app.get("/hayvan/:id", function(req,res){

  var idDegeri = req.params.id-1;

  var sql= "SELECT * from hayvanlar";

  connection.query(sql, function(err, results, fields){

    var idHayvan = idDegeri;
    var hayvanAdi      = results[idDegeri].adi;
    var hayvanTuru   = results[idDegeri].turu;
    var hayvanAnavatani      = results[idDegeri].anavatani;
    var hayvanAciklama   = results[idDegeri].aciklama;
    var hayvanResim = results[idDegeri].resimlinki;


    console.log(idHayvan);

  res.render("hayvan",{
                          id:idHayvan,
                          adi:hayvanAdi,
                          turu:hayvanTuru,
                          anavatani:hayvanAnavatani,
                          aciklama:hayvanAnavatani,
                          resim:hayvanResim




            });
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




// app.get("/turler/:hayvanturu",function(req,res){
//
//   var hayvanTuru = req.params.hayvanturu;
//   var sql = "SELECT * FROM hayvanlar.hayvanlar where hayvanlar.turu="+hayvanTuru;
//
//   connection.query(sql, function(err, results, fields){
//
//     var turler=results;
//     var hayvanAdi      = results.adi;
//     var hayvanTuru   = results.turu;
//     var hayvanAnavatani      = results.anavatani;
//     var hayvanAciklama   = results.aciklama;
//     var hayvanResim = results.resimlinki;
//
//
//
//   res.render("turler", {
//                           turler:turler,
//                           adi:hayvanAdi,
//                           turu:hayvanTuru,
//                           anavatani:hayvanAnavatani,
//                           aciklama:hayvanAciklama,
//                           resim:hayvanResim
//
//
//
//
//                       }
//             );
//
//
// });
// });





app.listen(8000);
