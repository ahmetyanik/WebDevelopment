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

    res.render("hayvan", {  ad:ad,
                            id:id,
                            tur:tur,
                            anavatani:anavatani,
                            resimlinki:resimlinki,
                            evcilmi:evcilmi,
                            beslenme:beslenme,
                            aciklama:aciklama

    } );


  });

});



app.get("*", function(req,res){

  res.send("Hatali istek!")
});



app.listen(8000);
