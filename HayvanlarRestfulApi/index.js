const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const mongoose   = require("mongoose");
const https      = require("https");
app.use(express.static(__dirname + "/dosyalar"));

const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://ahmet:1234@cluster1.v1mua.mongodb.net/Cluster1?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended :true}));

const hayvanSchema = {

  tur:String,
  ad:String,
  anavatani:String,
  resimlinki:String
};


const Hayvan = mongoose.model("Hayvan",hayvanSchema);


app.get("/", function(req,res){

  Hayvan.find({}, function(err,gelenHayvanlar){
    res.render("anasayfa",{hayvanlar:gelenHayvanlar});
  })
});

app.post("/",function(req,res){

  const tur = req.body.tur;
  const ad = req.body.ad;
  const anavatani = req.body.anavatani;
  const resimlinki=req.body.resimlinki;

  var hayvan = new Hayvan(

    {

        tur:tur,
        ad:ad,
        anavatani:anavatani,
        resimlinki:resimlinki

    }
  );

  hayvan.save(function(err){

      res.redirect("anasayfa");
  });

});

app.route("/api/hayvanlar/:id")

    .get(function(req,res){
      Hayvan.findOne({_id:req.params.id}, function(err,gelenVeri){

        res.send(gelenVeri);

      })
    })

    .delete(function(req,res){

      var sifre=req.body.sifre;
      if(sifre=="1234"){
        Hayvan.deleteOne({_id:req.params.id},function(err){
          if(!err)
          res.send({sonuc:"Kayit basariyla silindi"});
          else
          res.send(err);
        });
      }else{
        res.send({sonuc:"Sifre hatali!"})
      }
    })

    .put(function(req,res){
      var adGelen = req.body.ad;
      var turGelen = req.body.tur;

      Hayvan.update({_id:req.params.id},{ad:adGelen, tur:turGelen},{overwrite: true}, function(err){
        if(!err)
        res.send({sonuc:"Kayit basariyla güncellendi"});
        else{
          res.send(err);
        }
      })
    })

    .patch(function(req,res){
      var adGelen=req.body.ad;
      var turGelen=req.body.tur;

      Hayvan.update({_id:req.params.id},{$set:req.body},function(err){
        if(!err)
        res.send({sonuc:"Kayit basariyla güncellendi"});
        else{
          res.send(err);
        }
      })
    })









let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}
app.listen(port, function(){
  console.log("port numarasi : " + port);
});
