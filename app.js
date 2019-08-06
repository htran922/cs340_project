var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.set('mysql', mysql);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/artifact', require('./artifact.js'));
app.use('/staff', require('./staff.js'));
app.use('/event', require('./event.js'));
app.use('/exhibition', require('./exhibition.js'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});