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
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(express.static(__dirname + "/dosyalar"));
app.use(bodyParser.json());
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
var bolgeAdlari = [];




app.get("/", function(req,res){

  var bolgeAdi= req.query.bolgeAdi;
  var ilAdi = req.query.ilAdi;
  var resimlinki=req.query.resimlinki;

console.log(ilAdi);


  Bolge.find({},function(err, gelenVeriler){




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

app.post("/ekle", upload.single('dosya')  , function(req,res){

  var resimlinki = "";
  if(req.file){
    resimlinki = "/resimler/"+(req.file.filename).toLowerCase();
  }

  var bolgeAdi= req.body.bolgeAdi;
  var ilAdi = req.body.ilAdi;
  var ilPlakaNo= req.body.ilPlakaNo;
  var ilNufus = req.body.ilNufus;
  var bolgeAdi= req.body.bolgeAdi;
  var ilceSayisi = req.body.ilceSayisi;
  var ilceAdi=req.body.ilceAdi;
  var resimlinki=bolgeAdi;



  console.log("resimlinki:" +resimlinki);
  console.log("ilAdi: "+ilAdi);

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

    res.redirect("/");
  });


  });

  app.get("/bolgeler/:bolgeAdi", function(req,res){

    var bolge = req.params.bolgeAdi;


    Bolge.find({bolgeAdi:bolge},function(err,gelenBolgeler){

console.log(gelenBolgeler);

      res.render("bolge",{bolge:gelenBolgeler,
                          bolgeAdlari:bolgeAdlari});
    });


  });

  app.get("/bolgeler/:bolgeAdi/:sehir", function(req,res){

    var bolge = req.params.bolgeAdi;
    var sehir = req.params.sehir;
    console.log("sehir:"+sehir);
    var link = "https://api.openweathermap.org/data/2.5/weather?q="+sehir+"&appid=a7ccf39f58624360e151dce17c818ef3";

    https.get(link, function(response){

      console.log("statusCode: ", response.statusCode);

      response.on("data", function(gelenData){

        console.log(gelenData);

        var havaDurumu = JSON.parse(gelenData);



        console.log(havaDurumu);






    Bolge.find({ilAdi:sehir},function(err,gelenSehir){



      res.render("sehir",{sehir:gelenSehir,
                          sehirHava:havaDurumu,
                          bolgeAdlari:bolgeAdlari});
    });
  });
  });
  });

  app.get("/arama", function(req,res){

    var aranan = (req.query.arananKonum).substring(0,1).toUpperCase()+(req.query.arananKonum).substring(1).toLowerCase();

    var link = "https://api.openweathermap.org/data/2.5/weather?q="+aranan+"&appid=a7ccf39f58624360e151dce17c818ef3";

    https.get(link, function(response){

      console.log("statusCode: ", response.statusCode);

      response.on("data", function(gelenData){

        console.log(gelenData);

        var havaDurumu = JSON.parse(gelenData);



        console.log(havaDurumu);






    Bolge.find({ilAdi:aranan},function(err,gelenSehir){

      if(gelenSehir.length==0){
        res.send("Aradiginiz sehir bulunamadi!");
      }else{

        res.render("sehir",{sehir:gelenSehir,
                            sehirHava:havaDurumu,
                            bolgeAdlari:bolgeAdlari});

      }

    });

  });

});

});



app.get("/api/sehirekle",function(req,res){

    res.sendFile(__dirname + "/views/sehirekle.html");
});















let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}
app.listen(port, function(){
  console.log("port numarasi : " + port);
});
