var express = require("express");
var app = express();

var session = require("express-session");
app.use(session({secret: "yamakemykokorogodokidokidonchaknow"}));

var path = require("path");
app.use(express.static(path.resolve(__dirname, "static")));
app.set('views', path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response) {
    request.session.name = undefined;
    request.session.location = undefined;
    request.session.favorite_language = undefined;
    request.session.comment = undefined;
    response.render('index');
});

app.post('/process', function(request, response) {
    request.session.name = request.body['name'];
    request.session.location = request.body['location'];
    request.session.favorite_language = request.body['favorite_language'];
    request.session.comment = request.body['comment'];
    response.redirect('/result');
});

app.get('/result', function(request, response) {
    context = {};
    context['name'] = request.session.name;
    context['location'] = request.session.location;
    context['favorite_language'] = request.session.favorite_language;
    context['comment'] = request.session.comment;
    response.render('result', context);
    request.session.name = undefined;
    request.session.location = undefined;
    request.session.favorite_language = undefined;
    request.session.comment = undefined;
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});