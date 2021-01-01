var express = require("express");
var app = express();

app.set("view engine","ejs");



app.get("/kitap", function(req,res){

  var bilgiler = {
                  resim    : "https://img.kitapyurdu.com/v1/getImage/fn:11291017/wh:true/wi:256/pc:190", 
                  kitapAdi : "Sefiller",
                  yazar    : "Victor Hugo",
                  aciklama : "Fransız yazarı Victor Hugo (1802-1885, Sefiller adlı dev romanının önsözünü şöyle bitirir: 'Yeryüzünde yoksulluk ve bilgisizliğin egemenliği sürdükçe, böylesi kitaplar gereksiz sayılmayabilir.' Victor Hugo, ateşli bir yurtseverdi. Yurdunun çıkarları adına siyasal kavgalardan hiç çekinmedi. Bu yüzden adına siyasal kavgalardan hiç çekinmedi. Bu yüzden de tam yirmi yıl sürgünde kaldı. Bu sürgün yılları, gerek şiir, gerek roman açısından onun en verimli dönemi oldu. Sefiller de bu yılların ürünüdür (1862). Bu dev romanı, genç okurlara yalınlaştırılmış, kısaltılmış biçimiyle sunarak, bu ölümsüz yapıta yeni okurlar kazandırmayı amaçlıyoruz. Özellikle, direnişçilerin safında yer alan Küçük Gavroş'un serüvenini kolay kolay unutamayacaksınız. Bu romanda bir toplumun çöküş yıllarını yaşarken, o toplumun içindeki diriliş tohumlarının yeşerdiğini de göreceksiniz."}

                 res.render("kitap",bilgiler)

});




app.listen(7001);
