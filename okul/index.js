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


app.get("/sinif", function(req,res){

  var sql="SELECT * FROM okul.ogrenciler";

  connection.query(sql,function(err,results,fields){

  var ogrenciler = results;

  console.log(ogrenciler.adsoyad);
  console.log(ogrenciler.length);
  console.log(ogrenciler[0].adsoyad);



  res.render("sinif", {ogrenciler:ogrenciler});

});


});




app.post("/ogrencigiriskontrol",upload.single('dosya'),function(req,res){

  var adsoyad = req.body.ogrenciadi;
  var numara  = req.body.ogrencinumarasi;
  var sifre   = req.body.ogrencisifresi;

  var sql="SELECT * FROM okul.ogrenciler WHERE adsoyad='"+adsoyad+"' AND ogrencino='"+numara+"'AND sifre='"+sifre+"'";

    connection.query(sql,  function(err, results, fields){
      var bulunanOgrenci=results;
      console.log(bulunanOgrenci);




      if(bulunanOgrenci.length>0){


        var sql2="SELECT * FROM okul.notlar WHERE id IN (SELECT id FROM okul.ogrenciler WHERE adsoyad='"+adsoyad+"')";

        connection.query(sql2,function(err,results,fields){

          var notlar=results;
          console.log(notlar);
          console.log("Notlar0: "+notlar[0].turkce1);
          var turkceort= ((notlar[0].turkce1+notlar[0].turkce2+notlar[0].turkcesozlu)/3).toFixed(2);
          var matematikort= ((notlar[0].matematik1+notlar[0].matematik2+notlar[0].matematiksozlu)/3).toFixed(2);
          var fenort= ((notlar[0].fen1+notlar[0].fen2+notlar[0].fensozlu)/3).toFixed(2);
          var sosyalort= ((notlar[0].sosyal1+notlar[0].sosyal2+notlar[0].sosyalsozlu)/3).toFixed(2);

          var yabancidilort= ((notlar[0].yabancidil1+notlar[0].yabancidil2+notlar[0].yabancidilsozlu)/3).toFixed(2);
          var dinkulturuort= ((notlar[0].dinkulturu1+notlar[0].dinkulturu2+notlar[0].dinkulturusozlu)/3).toFixed(2);
          var gorselsanatlarort= ((notlar[0].gorselsanatlar1+notlar[0].gorselsanatlar2+notlar[0].gorselsanatlarsozlu)/3).toFixed(2);
          var muzikort= ((notlar[0].muzik1+notlar[0].muzik2+notlar[0].muzik1sozlu)/3).toFixed(2);

          res.render("ogrenci",{  ogrenci:bulunanOgrenci,
                                  notlar:notlar,
                                  turkceort:turkceort,
                                  matematikort:matematikort,
                                  fenort:fenort,
                                  sosyalort:sosyalort,
                                  yabancidilort:yabancidilort,
                                  dinkulturuort:dinkulturuort,
                                  gorselsanatlarort:gorselsanatlarort,
                                  muzikort:muzikort

                                });

        });
      }else{

        res.send("Böyle bir ögrenci bulunamadi!");
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
