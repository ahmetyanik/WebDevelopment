const express = require("express");
const app     = express();
app.set("view engine","ejs");
app.use(express.static(__dirname + "/dosyalar"));

var ucTaneKitap = [
  {kitapIsmi: "Sefiller",fiyat: 20, index: 0},
  {kitapIsmi: "Suc ve Ceza",fiyat: 50, index:1},
  {kitapIsmi: "Tehlikeli Oyunlar",fiyat: 20,index:2}
];

app.get("/", function(req,res){


res.render("anasayfa", {kitaplar:ucTaneKitap});

});

app.get("/kitap/:isim", function(req,res){

  var kitapIsmi = req.params.isim;

  res.send("kitap ismi: "+kitapIsmi);

});

app.get("/kitap/:isim/:index", function(req,res){

  var indexDegeri = req.params.index;

  var kitapIsmi = ucTaneKitap[indexDegeri].kitapIsmi;
  var kitapFiyati= ucTaneKitap[indexDegeri].fiyat;

  res.render("kitap" , {isim:kitapIsmi , fiyat:kitapFiyati} );

});



// app.get("/urun-:baslik",function(req,res){
//   res.send("deneme");
// });
//
//
// app.get("/:isim/dp/:urunkodu/:referans", function(req,res){
//
//       res.send("Merhaba dogru adres");
//
// });





app.listen(8000);
