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
  database : 'hayvanlar'
});

connection.connect(function(err){
  if(err) throw err;
  console.log("MYSQL'e bağlandı..");
});


app.get("/", function(req,res){

  connection.query("SELECT * from hayvanlar", function(err, results, fields){

    var veriTabaniHayvanlar = results;

    console.log(veriTabaniHayvanlar);

  res.render("anasayfa",{
                          hayvanlar:veriTabaniHayvanlar}
            );
});
});




app.listen(8000);