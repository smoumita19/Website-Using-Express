//For module

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//==================================================

var app = express();

//In which folder the template files will be
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public'))); //public folder be static

//==================================================

//For route

app.get('/', function(req,res){
    // console.log('Hello World'); //It will run in the server
    // res.send('Hello world!'); //It will send to the browser
    res.render('index', {title: 'Welcome'}); //renders page
});

app.get('/about', function(req,res){
    res.render('about'); //renders page
});


app.get('/contact', function(req,res){
    res.render('contact'); //renders page
});


app.post('/contact/send', function(req,res){
    // console.log('Test') //form submitted

    var transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {
            user: 'smoumita.ms96@gmail.com',
            pass: 'MMM2348MMM'
        }

    });
      
    var mailOptions = {
        from: 'Moumita Sen <smoumita.ms96@gmail.com>',
        to: 'smoumita19@yahoo.com',
        subject: 'test',
        text: 'You have a submission with the following details..Name:' + req.body.name+ ' Email' + req.body.email + ' Message: ' + req.body.message,
        html: '<p>Testing testing one two three</p>'

    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message sent: ' + info.response);
            res.redirect('/');

        }
    })

});




app.listen(3000);
console.log('Server is running on port 3000...');