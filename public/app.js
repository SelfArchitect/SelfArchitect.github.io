var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname+"/public"));

app.listen(3000, function(){
console.log("app listening on port 3000");
});
