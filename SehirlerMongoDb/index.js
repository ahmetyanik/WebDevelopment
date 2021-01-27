const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(express.static(__dirname + "/dosyalar"));
const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const https      = require("https");

mongoose.connect("mongodb+srv://ahmet:1234@cluster1.v1mua.mongodb.net/Cluster1?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});

var bolgeler = new Schema(

  {
    bolgeAdi:String,
    ilAdi:String,
    ilPlakaNo:String,
    ilNufus:String,
    ilceSayisi:String,
    ilceAdi:String,
    resimlinki:String



  }
);

var Bolge = mongoose.model("Bolge",bolgeler);



app.get("/", function(req,res){

  var bolgeAdi= req.query.bolgeAdi;
  var ilAdi = req.query.ilAdi;
  var resimlinki=req.query.resimlinki;

console.log(ilAdi);


  Bolge.find({},function(err, gelenVeriler){

    var bolgeAdlari = [];


  for(var i=0;i<gelenVeriler.length;i++){

    if(!bolgeAdlari.includes(gelenVeriler[i].bolgeAdi)){

      bolgeAdlari.push(gelenVeriler[i].bolgeAdi);
    }
  }



    res.render("anasayfa",{bolge:gelenVeriler,
                          bolgeAdlari:bolgeAdlari
        });

  });


});

app.post("/ekle", function(req,res){

  var bolgeAdi= req.body.bolgeAdi;
  var ilAdi = req.body.ilAdi;
  var ilPlakaNo= req.body.ilPlakaNo;
  var ilNufus = req.body.ilNufus;
  var bolgeAdi= req.body.bolgeAdi;
  var ilceSayisi = req.body.ilceSayisi;
  var ilceAdi=req.body.ilceAdi;
  var resimlinki=req.body.resimlinki;

  console.log("----------------------");
  var il = new Bolge(
    {
      bolgeAdi:bolgeAdi,
        ilAdi:ilAdi,
        ilPlakaNo:ilPlakaNo,
        ilNufus:ilNufus,
        ilceSayisi:ilceSayisi,
        ilceAdi:ilceAdi,
        resimlinki:resimlinki


    }
  )

  il.save(function(err){

    res.redirect("anasayfa");
  });


  });

  app.get("/bolgeler/:bolgeAdi", function(req,res){

    var bolge = req.params.bolgeAdi;
    console.log(bolge);

    Bolge.find({bolgeAdi:bolge},function(err,gelenBolgeler){

      console.log(gelenBolgeler.bolgeAdi);

      res.render("bolge",{bolge:gelenBolgeler});
    });


  });






















let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}
app.listen(port, function(){
  console.log("port numarasi : " + port);
});
