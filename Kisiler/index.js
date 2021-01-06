var express = require("express");
var app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname+"/dosyalar"));



var kisi= [
  {
    isim:"Ahmet",
    soyisim:"Yanik",
    medeniDurum:"Evli",
    dogumYeri:"Bursa",
    fotograf:"/resimler/profil.jpg",
    index:0

},
    {
      isim:"Süleyman",
      soyisim:"Akyaka",
      medeniDurum:"Bekar",
      dogumYeri:"Corum",
      fotograf:"/resimler/dilek.jpg",
      index:1
    },

    {
      isim:"Hamdi",
      soyisim:"Alkan",
      medeniDurum:"Bekar",
      dogumYeri:"Nigde",
      fotograf:"/resimler/murat.jpg",
      index:2
    },

    {
      isim:"Radu",
      soyisim:"Niculescu",
      medeniDurum:"Evli",
      dogumYeri:"Tarsus",
      fotograf:"/resimler/ayse.jpg",
      index:2
    }

];

app.get("/",function(req,res){

  res.render("anasayfa",{kisi:kisi});
});

app.get("/kisi/:isim/:index",function(req,res){

  var indexDegeri = req.params.index;
  var kisiIsmi = kisi[indexDegeri].isim;
  var kisiSoyIsmi = kisi[indexDegeri].soyisim;
  var kisiMedeniDurum = kisi[indexDegeri].medeniDurum;
  var kisiDogumYeri = kisi[indexDegeri].dogumYeri;
  var kisiFotograf = kisi[indexDegeri].fotograf;

  res.render("kisi",{index:indexDegeri,
                     isim:kisiIsmi,
                     soyIsim:kisiSoyIsmi,
                     medeniDurum:kisiMedeniDurum,
                     dogumYeri:kisiDogumYeri,
                     fotograf:kisiFotograf,
                     kisi:kisi
  });
});


app.get("/kategori/:medeniDurum", function(req,res){

    res.render("kategori", {kisi:kisi});


});

app.get("/bekarlar", function(req,res){

    res.render("bekarlar", {kisi:kisi});


});

app.get("/evliler", function(req,res){



    res.render("evliler", {kisi:kisi});


});










app.listen(8000);
