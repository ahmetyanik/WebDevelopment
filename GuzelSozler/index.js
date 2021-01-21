const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const mongoose   = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://ahmet:1234@cluster0.iblch.mongodb.net/Cluster0?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended :true}));


const guzelSozSema = {
  kategori : String,
  icerik : String
};
const GuzelSoz = mongoose.model("GuzelSoz", guzelSozSema);
/*
var guzelSoz1 = new GuzelSoz({
  kategori : "Kurtlar Vadisi",
  icerik : "Sonunu düşünen kahraman olamaz."
});
var guzelSoz2 = new GuzelSoz({
  kategori : "Kurtlar Vadisi",
  icerik : "Ölüm Ölüm dediğin nedir ki gülüm? ben senin için yaşamayı göze almışım.."
});
var guzelSoz3 = new GuzelSoz({
  kategori : "Kurtlar Vadisi",
  icerik : "Hukuk insanı sadece yaşatmaz, öldürür de."
});
guzelSoz1.save();
guzelSoz2.save();
guzelSoz3.save();
*/
//  TÜM GÜZEL SÖZLERİ JSON FORMATINDA RETURN EDELİM..
app.get("/api/guzelsozler", function(req, res){
  GuzelSoz.find({} , function(err, gelenVeriler){
    res.send(gelenVeriler);
  })
});
//  ID'sine göre JSON FORMATINDA 1 TANE GÜZEL SÖZ RETURN EDELİM.
app.get("/api/guzelsozler/:id", function(req, res){
  var gelenId = req.params.id;
  GuzelSoz.findOne({_id : gelenId} , function(err, gelenVeri){
    res.send(gelenVeri);
  });
});


app.post("/api/guzelsozkayit", function(req, res){
  var kategori = req.body.kategori;
  var icerik   = req.body.icerik;
  console.log(kategori);
  console.log(icerik);
  var guzelSoz = new GuzelSoz({
    kategori : kategori,
    icerik : icerik
  });
  guzelSoz.save(function(err){
    if(!err)
      res.send("Başarıyla kayıt edildi.");
    else
      res.send(err);
  });
});


app.delete("/api/guzelsozsil/:id", function(req,res){

  GuzelSoz.deleteOne({_id:req.params.id},function(err){

    if(!err)
    res.send("Basariyla silindi")
    else
    res.send(err);

  });

})



app.listen(5000, function(){
  console.log("5000 Portuna Bağlandık.")
})
