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
  host     : 'localhost',
  user     : 'root',
  password : '12344321',
  database : 'canlilar'
});




app.get("/", function(req,res){

  var sql= "SELECT * FROM canlilar.hayvanlar";

  connection.query(sql,function(err,results,fields){


    var tumHayvanlar=results;
    console.log(tumHayvanlar);

    res.render("anasayfa", {
                            butunHayvanlar:tumHayvanlar} );


  });


});

app.get("/hayvan/:adi/:id", function(req,res){

  var idDegeri= req.params.id-1;

  var sql= "SELECT * FROM canlilar.hayvanlar";

  connection.query(sql,function(err,results,fields){

    var ad= results[idDegeri].ad;
    var id= results[idDegeri].id;
    var tur= results[idDegeri].tur;
    var anavatani= results[idDegeri].anavatani;
    var resimlinki= results[idDegeri].resimlinki;
    var evcilmi= results[idDegeri].evcilmi;
    var beslenme= results[idDegeri].beslenme;
    var aciklama= results[idDegeri].aciklama;

    console.log(ad);


    res.render("hayvan", {  ad:ad,
                            id:id,
                            tur:tur,
                            anavatani:anavatani,
                            resimlinki:resimlinki,
                            evcilmi:evcilmi,
                            beslenme:beslenme,
                            aciklama:aciklama,
                            hayvanlar:results

    } );


  });

});


app.get("/hayvanekle",function(req,res){


  res.sendFile(__dirname+"/views/hayvanekle.html")
});


app.post("/veritabanina-ekle",upload.single('dosya'),function(req,res){

  var resimlinki = "";
  if(req.file){
    resimlinki = "/resimler/"+req.file.filename;
  }

  var ad = req.body.hayvanadi;
  var tur=req.body.hayvanturu;
  var anavatani = req.body.hayvananavatani;
  var aciklama=req.body.aciklama;
  var evcilmi = req.body.hayvanevcilmi;
  var beslenme=req.body.hayvanbeslenme;

  console.log(req.body);
  console.log(ad);

  var sql= "INSERT INTO canlilar.hayvanlar (ad, tur, anavatani,aciklama,evcilmi,beslenme,resimlinki) VALUES ('"+ad+"', '"+tur+"', '"+anavatani+"','"+aciklama+"','"+evcilmi+"','"+beslenme+"','"+resimlinki+"')";

  connection.query(sql, function(err, results, fields){
    res.redirect("/hayvanekle");
  });


});


app.get("/arama",function(req,res){

  var kelime=req.query.hayvan;

  var sql="SELECT * FROM canlilar.hayvanlar Where canlilar.hayvanlar.ad LIKE '%" + kelime + "%'";

  connection.query(sql, function(err, results, fields){
      var bulunanHayvanlar=results;
      var ad = bulunanHayvanlar[0].ad;
      console.log(bulunanHayvanlar);
      res.render("arama",{hayvanlar:bulunanHayvanlar,
                          ad:ad
      });
  });

})



app.get("*", function(req,res){

  res.send("Hatali istek!")
});



app.listen(8000);
