const bodyParser = require("body-parser");
const express = require("express");
const app     = express();
app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/dosyalar"));

var ucTaneKitap = [
  {
    kitapismi : "Sefiller" ,
    fiyat: 20 ,
    index : 0  ,
    resimlinki :  "/resimler/sefiller.jpg",
    yayinevi : "Papatya",
    aciklama : "İlk olarak 1862'de yayınlandı. 19. yüzyılın en büyük eserlerinden biri olarak kabul gördü. Hikâye 1815'te başlar ve 1832'deki Paris Haziran Ayaklanması'nda son bulur. Birkaç karakterin yaşamını ve birbirleriyle alakasını ele alan roman daha çok eski mahkûm Jean Valjean'ın yaşam mücadelesi ve kefaretini ödemeye çalışmasına odaklanır.Yasa ve merhametin doğasının incelendiği roman ayrıca Fransa tarihi, Paris'in mimarisi ve kentsel tasarımı, siyaset, ahlak felsefesi, antimonarşizm, adalet, din, ailevi ve romantik sevginin türleri ve doğası gibi konuları özenle ele alır.",
    yazar : "Victor Hugo",
    kategori : "Roman"
  },
  {
    kitapismi : "Suç ve Ceza" ,
    fiyat: 50,
    index : 1,
    resimlinki :  "/resimler/sucveceza.jpg",
    yayinevi : "Karbon",
    aciklama : "Dostoyevski (1821-1881): Gerek 1840 ortalarından itibaren yayımlamaya başladığı Beyaz Geceler ve Öteki gibi uzun öykü-kısa romanlarıyla, gerekse ilkini elinizde tuttuğunuz Suç ve Ceza, Budala ve Karamazov Kardeşler gibi Sibirya sürgünü sonrası büyük romanlarıyla Dostoyevski, insanın karanlık yakasını kendinden sonraki bütün romancıları derinden etkileyecek biçimde dile getirmiş büyük bir 19. yüzyıl ustasıdır. Mazlum Beyhan (1944); Yayımlamış olduğu Dostoyevski’den Suç ve Ceza ve Budala, Tolstoy’dan Çocukluğum, İlkgençliğim, Gençliğim ve Gogol’dan Arabeskler benzeri çalışmalar düşünüldüğünde, Beyhan, hiç tartışmasız son 35 yılın en önemli Rus edebiyatı çevirmenlerinden biridir.",
    yazar : "Dostoyevski",
    kategori : "Roman"
  },
  {
    kitapismi : "Tehlikeli Oyunlar" ,
    fiyat: 30,
    index: 2,
    resimlinki : "/resimler/tehlikelioyunlar.jpg",
    yayinevi : "İş Bank",
    aciklama : "Türkiye’de postmodern edebiyatın en güçlü temsilcisi olarak görülen Oğuz Atay, Tehlikeli Oyunlar romanıyla günümüzde de sıkça konuşulmaya devam ediyor. Yazarın Tutunamayanlar’dan sonra ikinci eseri olarak kaleme aldığı Tehlikeli Oyunlar, bireyin toplum ve kendisi ile olan sorunlarını ele alıyor. Başkahramanın kişiliği bakımından Tutunamayanlar ile aynı düzlemde ilerleyen roman, bu yönüyle Atay’ın “anlaşılamama” kaygısını yeniden ve güçlü bir şekilde vurguluyor. Postmodernist Edebiyatın Güçlü Bir Temsili Okurlarıyla ilk olarak 1973 yılında buluşan Tehlikeli Oyunlar, Atay’ın Türk edebiyatındaki sınırları ikinci kez yıkması bakımından büyük bir önem taşıyor. Postmodernist roman akımının Türkiye’deki artçı gücü olan eser, kendisinden sonra verilecek pek çok başarılı eserin de ilham kaynağını oluşturuyor. Tehlikeli Oyunlar’da, postmodernist roman akımının dünyadaki öncüleri sayılan James Joyce ve Vladimir Nabokov gibi güçlü yazarların etkisi de hissediliyor.",
    yazar : "Oğuz Atay",
    kategori : "Roman"
  },
  {
    kitapismi : "Şeker Portakalı" ,
    fiyat: 40,
    index: 3,
    resimlinki : "/resimler/sekerportakali.jpg",
    yayinevi : "Can Çocuk",
    aciklama : "Acı dolu bir hayat sürdürmek ve bunu yaşamın olağan seyri gibi kabul etmek, ta ki hayattaki en gerçek ve karşı konulamaz acının ne olduğunu öğrenene kadar… Şeker Portakalı; yoksulluk ve sevgisizlik içinde yaşayan küçük Zeze’nin dünyasını, okuyucusuna yalnızca minik bir çocuğun gözünden değil, evrensel bir hakikat penceresinden sunuyor. Brezilyalı yazar Jose Mauro de Vasconcelos’un 1968’de yayımlanan Şeker Portakalı adlı eseri, yalın anlatımı ve çarpıcı hikâyesiyle dünya edebiyatının unutulmaz başyapıtları arasında yer alıyor. Yazarının hayatından izler taşıyan eser, bir çocuğun iç dünyasından yola çıkarak tüm insanlığa acıyla yoğrularak olgunlaşmanın ağırlığını duyumsatıyor. Gerçekçi anlatımı ve duygu ağırlıklı temasıyla Latin Amerika edebiyatını tüm yönleriyle yansıtan Şeker Portakalı; saflığı, şefkati ve acıyı eksiksiz bir empati ile iliklerinize kadar hissetmenizi sağlayacak.",
    yazar : "Jose Mauro De Vasconcelos",
    kategori : "Roman"
  },
  {
    kitapismi : "Serenad",
    fiyat: 50,
    index : 4,
    resimlinki : "/resimler/serenad.jpg",
    yayinevi : "Doğan Kitap",
    aciklama: "Her şey, 2001 yılının Şubat ayında soğuk bir gün, İstanbul Üniversitesi'nde halkla ilişkiler görevini yürüten Maya Duran'ın (36) ABD'den gelen Alman asıllı Profesör Maximilian Wagner'i (87) karşılamasıyla başlar. 1930'lu yıllarda İstanbul Üniversitesi'nde hocalık yapmış olan profesörün isteği üzerine, Maya bir gün onu Şile'ye götürür. Böylece, katları yavaş yavaş açılan dokunaklı bir aşk hikâyesine karışmakla kalmaz, dünya tarihine ve kendi ailesine ilişkin birtakım sırları da öğrenir. Serenad, 60 yıldır süren bir aşkı ele alırken, ister herkesin bildiği Yahudi Soykırımı olsun isterse çok az kimsenin bildiği Mavi Alay, bütün siyasi sorunlarda asıl harcananın, gürültüye gidenin hep insan olduğu gerçeğini de göz önüne seriyor. Okurunu sımsıkı kavrayan Serenad'da Zülfü Livaneli'nin romancılığının en temel niteliklerinden biri yine başrolde: İç içe geçmiş, kaynaşmış kişisel ve toplumsal tarihlerin kusursuz Dengesi.",
    yazar : "Zülfü Livaneli",
    kategori : "Roman"
  },
  {
    kitapismi : "Simyacı",
    fiyat : 35,
    index : 5,
    resimlinki : "/resimler/simyaci.jpg",
    yayinevi : "Özdemir",
    aciklama : "Dünya edebiyatının fenomenleri arasında yer alan Simyacı, yayımlandığı günden bugüne pek çok hayata dokunmaya devam ediyor. Brezilyalı yazar Paulo Coelho tarafından 1988 yılında yayımlanan eser, Doğu ve Batı dünyasına aynı pencereden ışık tutuyor. Coelho’nun Mesnevi’deki bir kıssadan hareketle kaleme aldığı Simyacı, macera dolu öyküsü ve felsefi yönüyle başucu kitabınız olmaya aday! Etkileyici hikayesi, sade anlatımı ve derinliğiyle Simyacı, dünya klasiklerinin en sevilen eserlerinden biri. Yayımlandıktan kısa süre sonra 42 ülkede basılan ve 26 dile çevrilen eser, 1996’dan günümüze Türkiye’de de en çok okunan romanlar arasındaki yerini koruyor. Eğer hem bir macera tutkunu hem de felsefe meraklısıysanız Simyacı, sizi de etkisi altına alacak. Simyacı, Santiago adındaki Endülüslü bir çobanın İspanya’dan başlayıp Mısır’da sona eren yolculuğunu konu ediniyor.",
    yazar : "Paulo Chello",
    kategori : "Roman"
  },
  {
    kitapismi : "Körlük",
    fiyat : 35,
    index : 6,
    resimlinki : "/resimler/korluk.jpg",
    yayinevi : "Jose Saramago",
    aciklama : "Distopik eserlere ilgi duyanların elinden düşürmediği Körlük, yayınlandığı günden bu yana adından söz ettirmeye devam ediyor. Portekiz’li yazar José Saramago’ya 1998’de Nobel Edebiyat Ödülü’nü kazandıran eser, konusuyla olduğu kadar zekice kurgulanmış karakterleriyle de dikkat çekiyor. Dönemin liberal demokrasi anlayışına bir eleştiri mahiyetinde kaleme alınan roman, insanların gittikçe bencilleşip olaylar karşısında duyarsızlaşmasını bir körlük metaforu etrafında işliyor.Baştan sona heyecan verici olayların birbirini takip ettiği eser, sizi de derinden sarsacak. Güç ve iktidar oyunlarının insanlarda yarattığı vahşeti gözler önüne seren bu roman karşısında, bugünün toplumlarını düşünmeye başlayacaksınız. Kim bilir; belki de insanlığın sonunu, yine gittikçe duyarsızlaşan insanlığın ta kendisi getirecektir.",
    yazar : "Jose Saramago",
    kategori : "Roman"
  },
  {
    kitapismi : "Altıncı Koğuş",
    fiyat : 35,
    index : 7,
    resimlinki : "/resimler/altincikogus.jpg",
    yayinevi : "Yulva Muhurcişi",
    aciklama : "Çehov bir taşra kasabasındaki akıl hastanesinde geçen bu novellasında, eğitimli bir hasta olan İvan Dmitriç ile Doktor Andrey Yefimıç arasındaki felsefi çatışmaya odaklanır. İvan Dmitriç maruz kaldıkları adaletsizliğe, içinde yaşamaya zorlandıkları berbat koşullara karşı çıkarken, Andrey Yefimıç bunları görmezden gelmekte ısrar eder ve durumu değiştirmek için kılını bile kıpırdatmaz. Doktor sonunda içine düştüğü “felsefi” yanılgının farkına vardığında ise artık iş işten geçmiştir. Altıncı Koğuş, Rusya’nın ve ülkenin sorunlarıyla ilgilenmek yerine onları uzaktan izlemeyi tercih eden elit Rus aydınının “deliliği”nin simgesidir adeta. Altıncı Koğuş, Russkaya Mısl dergisinin 1892 kasım sayısında yayımlandığında büyük ilgi görmüştü. Hatta Lenin’in de yapıtı okuduktan sonra dehşete kapıldığı, “Kendimi Altıncı Koğuş’a kapatılmış gibi hissettim” dediği rivayet edilir. ",
    yazar : "Anton Pavloviç Çehov",
    kategori : "Roman"
  },
  {
    kitapismi : "Hayvan Çiftliği",
    fiyat : 35,
    index : 8,
    resimlinki : "/resimler/hayvanciftligi.jpg",
    yayinevi : "Celal Üster",
    aciklama : "Distopik romanlarıyla ünlenen İngiliz Yazar George Orwell tarafından 1945 yılında yayımlanan Hayvan Çiftliği adlı roman, masalsı atmosferinin altında derin bir sistem eleştirisi barındırıyor. Fabl türünde kaleme alınan eser, yazarın 1984 adlı romanıyla birlikte en geniş kitlelere ulaşan yapıtları arasında yer alıyor. Ön yüzünde bir çiftlik ve içinde yaşayan hayvanları konu edinen roman; devletleri, yönetim biçimlerini ve toplumları sembolik olduğu kadar sade bir anlatımla ele alıyor.Orwell’in çağdaş klasikler arasında değerlendirilen Hayvan Çiftliği romanı, dünya edebiyatının en dikkat çekici hiciv romanları arasında bulunuyor. Romanının alt metninde birden fazla yönetimin olumsuz yönüne yer veren yazar, ana temasını sosyalizm eleştirisi üzerine kuruyor. Orwell, ideoloji bakımından kendisi de sosyalizme eğilimli olmasının yanı sıra romanında totaliter yönetime meydan okuyor.",
    yazar : "George Orwell",
    kategori : "Roman"
  }
];


app.get("/" , function(req , res){
    res.render("anasayfa" , { kitaplar : ucTaneKitap } );
});

app.get("/kitap/:isim/:index", function(req, res){
    var indexDegeri = req.params.index;
    var kitapIsmi = ucTaneKitap[indexDegeri].kitapismi;
    var kitapFiyati = ucTaneKitap[indexDegeri].fiyat;
    var kitapYayinEvi = ucTaneKitap[indexDegeri].yayinevi;
    var kitapResim    = ucTaneKitap[indexDegeri].resimlinki;
    var kitapAciklama = ucTaneKitap[indexDegeri].aciklama;
    var kitapYazar = ucTaneKitap[indexDegeri].yazar;
    var kitapKategori = ucTaneKitap[indexDegeri].kategori;

    res.render("kitap" , { yazar : kitapYazar,
                           aciklama: kitapAciklama,
                           resim : kitapResim,
                           yayinevi : kitapYayinEvi,
                           isim : kitapIsmi ,
                           fiyat : kitapFiyati,
                           kategori : kitapKategori,
                           kitaplar : ucTaneKitap
                         });

});

app.get("/kategori/:kategorilink" , function(req , res){
    res.render("kategori" , { kitaplar : ucTaneKitap } );
});

app.get("/arama" , function(req , res){
  var kelime = req.query.kitap;
    res.send("Arama Sayfasi:"+kelime);
});


app.get("/kitapekle" , function(req , res){

    res.sendFile(__dirname+"/views/kitapekle.html");
});



app.post("/veritabanina-ekle",function(req,res){

  var kitapismi=req.body.kitapismi;
  var yazar = req.body.yazar;
  var fiyat=req.body.fiyat;
  var kategori = req.body.kategori;
  var yayinevi=req.body.yayinevi;
  var aciklama = req.body.aciklama;



res.redirect("/kitapekle");

});



let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}

app.listen(port, function(){
  console.log("port : " + port);
});
