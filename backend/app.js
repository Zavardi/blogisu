var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

app.listen(3000);


var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200', // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));


var user = require('./app/route/user.route.js');
user(app);

var categorie = require('./app/route/categorie.route.js');
categorie(app);

var comment = require('./app/route/comment.route.js');
comment(app);

var article = require('./app/route/article.route.js');
article(app);

var auth = require('./app/route/auth.route.js');
auth(app);