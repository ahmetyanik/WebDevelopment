const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(express.static(__dirname + "/dosyalar"));
const mongoose=require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://ahmet:1234@cluster0.iblch.mongodb.net/Cluster0?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});

var yapilacakListesi = new Schema(
  {

  gorev : String,
  tarih :Date
  }

);

var Gorev = mongoose.model("Gorev",yapilacakListesi);


var gorev1 = new Gorev(
  {
      gorev : "ToDoList'e hosgeldin",
      tarih : new Date()
  }
);

var gorev2 = new Gorev(
  {
      gorev : "+ butonuna tiklayarak veri ekleyebilirsin.",
      tarih : new Date()
  }
);

var gorev3 = new Gorev(
  {
      gorev : "<--Görevi silmek icin tiklayin.",
      tarih : new Date()
  }
);

// gorev1.save();
// gorev2.save();
// gorev3.save();

app.get("/", function(req, res) {
    Gorev.find({} , function(err, gelenVeriler){
      console.log(gelenVeriler);
      res.render("anasayfa");
    });
});
app.post("/ekle", function(req, res){
  var gelenAciklama = req.body.gorevAciklama;
  var gorev = new Gorev(
    {
      gorev: gelenAciklama,
      tarih: new Date()
    }
  );
  gorev.save(function(err){
    res.redirect("/");
  });
});











app.listen(5000);
