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


app.post("/sinif", function(req,res){

  var ogretmen = req.body.ogretmen;


  var sql="SELECT * FROM okul.ogrenciler";


  console.log(ogretmen);

  connection.query(sql,function(err,results,fields){

  var ogrenciler = results;





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




        connection.query("SELECT * FROM okul.notlar WHERE id IN (SELECT id FROM okul.ogrenciler WHERE adsoyad='"+adsoyad+"')", function(err,results,fields){

          var notlar=results[0];

          console.log(notlar);


          console.log("Notlar0: "+notlar.turkce1);
          var turkceort= ((notlar.turkce1+notlar.turkce2+notlar.turkcesozlu)/3).toFixed(2);
          var matematikort= ((notlar.matematik1+notlar.matematik2+notlar.matematiksozlu)/3).toFixed(2);
          var fenort= ((notlar.fen1+notlar.fen2+notlar.fensozlu)/3).toFixed(2);
          var sosyalort= ((notlar.sosyal1+notlar.sosyal2+notlar.sosyalsozlu)/3).toFixed(2);

          var yabancidilort= ((notlar.yabancidil1+notlar.yabancidil2+notlar.yabancidilsozlu)/3).toFixed(2);
          var dinkulturuort= ((notlar.dinkulturu1+notlar.dinkulturu2+notlar.dinkulturusozlu)/3).toFixed(2);
          var gorselsanatlarort= ((notlar.gorselsanatlar1+notlar.gorselsanatlar2+notlar.gorselsanatlarsozlu)/3).toFixed(2);
          var muzikort= ((notlar.muzik1+notlar.muzik2+notlar.muzik1sozlu)/3).toFixed(2);
          connection.query("SELECT * FROM okul.ogretmenler", function(err,results,fields){

          var ogretmenler= results;
          console.log(ogretmenler);
          console.log(ogretmenler[0].adsoyad);

            res.render("ogrenci",{  ogrenci:bulunanOgrenci,
                                    notlar:notlar,
                                    turkceort:turkceort,
                                    matematikort:matematikort,
                                    fenort:fenort,
                                    sosyalort:sosyalort,
                                    yabancidilort:yabancidilort,
                                    dinkulturuort:dinkulturuort,
                                    gorselsanatlarort:gorselsanatlarort,
                                    muzikort:muzikort,
                                    ogretmenler:ogretmenler




                                  });

          });

          })




      }else{

        res.send("Böyle bir ögrenci bulunamadi!");
      }




    });






});


var yetkiliOgretmen="";
var yetkiliOgretmenBrans="";
var yazili1="";
var yazili2="";
var sozlu="";
var formyazili1;
var formyazili2;
var formsozlu;






app.post("/ogretmengiriskontrol",upload.single('dosya'),function(req,res){

  var adsoyad = req.body.ogretmenadi;
  var sifre   = req.body.ogretmensifresi;

  var sql="SELECT * FROM okul.ogretmenler WHERE adsoyad='"+adsoyad+"' AND sifre='"+sifre+"'";


    connection.query(sql,   function(err, results, fields){
      var bulunanOgretmen=results;
      yetkiliOgretmen=bulunanOgretmen[0].adsoyad;
      yetkiliOgretmenBrans=bulunanOgretmen[0].brans;


      if(yetkiliOgretmenBrans=="Türkce"){

          yazili1="turkce1";
          yazili2="turkce2";
          sozlu="turkcesozlu";

      }else if (yetkiliOgretmenBrans=="Matematik") {

        yazili1="matematik1";
        yazili2="matematik2";
        sozlu="matematiksozlu";

      }else if (yetkiliOgretmenBrans=="Fen Bilimleri") {

        yazili1="fen1";
        yazili2="fen2";
        sozlu="fensozlu";

      }else if (yetkiliOgretmenBrans=="Sosyal Bilgiler") {

        yazili1="sosyal1";
        yazili2="sosyal2";
        sozlu="sosyalsozlu";

      }else if (yetkiliOgretmenBrans=="Yabanci Dil") {

        yazili1="yabancidil1";
        yazili2="yabancidil2";
        sozlu="yabancidilsozlu";

      }else if (yetkiliOgretmenBrans=="Din Kültürü ve Ahlak Bilgisi") {

        yazili1="dinkulturu1";
        yazili2="dinkulturu2";
        sozlu="dinkulturusozlu";

      }else if (yetkiliOgretmenBrans=="Görsel Sanatlar") {

        yazili1="gorselsanatlar1";
        yazili2="gorselsanatlar2";
        sozlu="gorselsanatlarsozlu";

      }else if (yetkiliOgretmenBrans=="Müzik") {

        yazili1="muzik1";
        yazili2="muzik2";
        sozlu="muzik1sozlu";

      }

      console.log("yazili1 :"+yazili1);





      if(bulunanOgretmen.length>0){

        connection.query("SELECT * FROM okul.ogrenciler INNER JOIN okul.mesajlar ON okul.ogrenciler.id=okul.mesajlar.ogrenciid WHERE ogretmenid="+bulunanOgretmen[0].id,   function(err, results, fields){

          var ogretmenmesajsayisi=results.length;
          console.log("ogretmenmesajsayisi: "+ogretmenmesajsayisi);
          console.log("bulunanOgretmen"+bulunanOgretmen[0].id);



        res.render("ogretmen", {ogretmen:bulunanOgretmen,
                                yetkiliOgretmen:yetkiliOgretmen,
                                ogretmenmesajsayisi:ogretmenmesajsayisi});


  });
      }else{

        res.send("Bilgi Bulunamadi!");
      }


    });



});



app.post("/ogrencinotsayfasi",upload.single('dosya'),function(req,res){

  var ogretmen=yetkiliOgretmen;
  var brans=yetkiliOgretmenBrans;
  console.log(ogretmen);



  var adsoyad = req.body.adsoyad;




  connection.query("SELECT * FROM okul.ogrenciler WHERE adsoyad='"+adsoyad+"'","SELECT * FROM okul.notlar WHERE id IN (SELECT id FROM okul.ogrenciler WHERE adsoyad='"+adsoyad+"')", function(err, results, fields){


    var bulunanOgrenci = results[0];
    var bulunanNotlar =results[1];

    console.log("bulunanNotlar: "+bulunanNotlar);






    console.log(bulunanOgrenci);
    connection.query("SELECT * FROM okul.ogretmenler WHERE adsoyad='"+ogretmen+"'", function(err,results,fields){

      var bulunanOgretmen=results[0];

      console.log("yetkiliOgretmen: "+yetkiliOgretmen);
      console.log("yetkiliOgretmenBrans: "+yetkiliOgretmenBrans);

      res.render("ogrencinotsayfasi", {adsoyad:adsoyad,
                                      ogrenci:bulunanOgrenci,
                                      yetkiliOgretmen:ogretmen,
                                      brans:brans,
                                      notlar:bulunanNotlar,
                                      bulunanOgretmen:bulunanOgretmen,



                                      });


  });

  });


});

console.log("yetkiliOgretmen: "+yetkiliOgretmen);
console.log("yetkiliOgretmenBrans: "+yetkiliOgretmenBrans);
console.log("yazili1 :"+yazili1);

app.post("/veritabaninaNotGonder",   upload.single('dosya') , function(req,res){

  formyazili1 = req.body.formyazili1;
  formyazili2 = req.body.formyazili2;
  formsozlu = req.body.formsozlu;
  formid=req.body.formid;


  console.log("---------------------------------------------");
  console.log("yetkiliOgretmen: "+yetkiliOgretmen);
  console.log("yetkiliOgretmenBrans: "+yetkiliOgretmenBrans);
  console.log("formyazili1: "+formyazili1);
  console.log("formyazili2: "+formyazili2);
  console.log("formsozlu: "+formsozlu);
  console.log("yazili1 :"+yazili1);
  console.log("yazili2 :"+yazili2);
  console.log("sozlu :"+sozlu);

  console.log("UPDATE okul.notlar SET " +yazili1+"="+formyazili1+","+yazili2+"="+formyazili2+","+sozlu+"="+formsozlu + " WHERE "+"id="+formid);

  connection.query("UPDATE okul.notlar SET " +yazili1+"="+formyazili1+","+yazili2+"="+formyazili2+","+sozlu+"="+formsozlu + " WHERE "+"id="+formid, function(err, results, fields){


  });

});

app.get("/mesaj",function(req,res){



  res.render("mesaj");
});




app.post("/mesajgonder",   upload.single('dosya') , function(req,res){

  var secilenOgretmen = req.body.secilenOgretmen;
  var mesaj = req.body.mesaj;
  var mesajogrenci=req.body.mesajogrenci;
  console.log("---------");
  console.log("secilenOgretmenid :"+secilenOgretmen);
  console.log(mesaj);
  console.log("mesajogrenciid: "+mesajogrenci);

  var sql = "INSERT INTO okul.mesajlar (ogretmenid, ogrenciid, mesaj) VALUES('"+secilenOgretmen+"','"+ mesajogrenci+"', '"+mesaj+"')";
  connection.query(sql, function(err, results, fields){

  });

  res.render("mesaj",{mesaj:mesaj,
                      secilenOgretmen:secilenOgretmen,
                      mesajogrenci:mesajogrenci

  });


});

app.post("/ogretmenmesaj",  upload.single('dosya') ,function(req,res){

  console.log(yetkiliOgretmen);
  var mesajalanogretmenid=req.body.mesajalanogretmenid;
  console.log("mesajalanogretmenid:"+mesajalanogretmenid);

  var sql1= "SELECT * FROM okul.ogretmenler WHERE id= "+mesajalanogretmenid;

  connection.query(sql1, function(err,results,fields){

    var mesajalanadsoyad = results[0].adsoyad;
    console.log("mesajalan:"+mesajalanadsoyad);

    var sql2="SELECT * FROM okul.ogrenciler INNER JOIN okul.mesajlar ON okul.ogrenciler.id=okul.mesajlar.ogrenciid WHERE ogretmenid="+mesajalanogretmenid;
    connection.query(sql2, function(err,results,fields){

        var tümbilgilermesajatan=results;
        console.log(tümbilgilermesajatan);

        res.render("mesajkutusu",{

                                  mesajalanogretmenid:mesajalanogretmenid,
                                  mesajalanadsoyad:mesajalanadsoyad,
                                  tümbilgilermesajatan:tümbilgilermesajatan

        })
    })


  })



});

app.post("/mesajsil",  upload.single('dosya')   ,  function(req, res){

    var mesajid= req.body.mesajid;
    console.log(mesajid);



    var sql = "DELETE FROM okul.mesajlar WHERE mesajid='"+mesajid+"'";
    connection.query(sql, function(err, results, fields){

    });
});








let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}
app.listen(port, function(){
  console.log("port : " + port);
});
