const express = require("express");
const app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname+"/dosyalar"));

var kisi = [
  {
    isim:"Ahmet Yanik",
    yas:"32",
    dogumYeri:"Bursa",
    diller:"Ingilizce, Almanca",
    medeniDurum:"Evli",
    cocukSayisi:"1",
    resim:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS422Xkq7NY3LGFOG5UDnoZPOCdpHY6pBMRAw&usqp=CAU",
    resimHakkimda:"https://static.wikia.nocookie.net/peaky-blinders/images/8/8e/Tommys3.jpg/revision/latest/scale-to-width-down/620?cb=20190715140230",
    resimIletisim:"https://th.bing.com/th/id/OIP.cfbFsYu026bgfUPRJB_ylQHaE8?w=278&h=185&c=7&o=5&dpr=1.5&pid=1.7"
  }
];


app.get("/" , function(req , res){
    res.render("anasayfa" , { kisi : kisi } );
});

app.get("/hakkimda" , function(req , res){
    res.render("hakkimda" , { kisi : kisi } );
});

app.get("/iletisim" , function(req , res){
    res.render("iletisim" , { kisi : kisi } );
});




app.listen(8000);
