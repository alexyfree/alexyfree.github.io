var express    =    require('express');
var app        =    express();
var nodemailer = require('nodemailer');

app.set('views',__dirname);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('index.html');
});
app.post('/send-email',function(req,res){
    var query = req.query;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bykovski.work@gmail.com',
            pass: '15397715'
        }
    });

    var htmlText = (query.name != null ? ("Имя: " + query.name + "<br>") : "") +
        (query.phone != null ? ("Телефон: " + query.phone + "<br>") : "") +
        (query.email != null ? ("Email: " + query.email + "<br>") : "") +
        (query.question != null ? ("Вопрос: " + query.question + "<br>") : "") +
        (query.description != null ? ("Цель: " + query.description) : "");

    var mailOptions = {
        from: 'bykovski.work@gmail.com', // sender address
        to: 'bykovski.work@gmail.com', // list of receivers
        subject: 'Hello', // Subject line
        html: htmlText // plaintext body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
 res.send('Done!');
});

var server = app.listen(8000,function(){
    console.log("Express is running on port 8000");
});