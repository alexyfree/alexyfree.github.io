/*
var express = require('express');
var app = express();
var path    = require("path");
var fs=require('fs');

app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});*/

var express    =    require('express');
var app        =    express();

app.set('views',__dirname);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('index.html',{
        dir: __dirname
    })
});
/*app.get('/about',function(req,res){
 res.render('about.html');
 });*/

var server = app.listen(8000,function(){
    console.log("Express is running on port 8000");
});