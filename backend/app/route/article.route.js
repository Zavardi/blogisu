module.exports = (app) => {

    const article = require('../controller/article.controller');

    var { authJwt } = require("../middleware");

    // Получение всех пользователей
    app.get('/api/articles', article.findAll);

    // Добавление пользователя
    app.post('/api/addArticle',  [authJwt.verifyToken], article.create);

    // Обновление данных пользователя по id
    app.post('/api/updateArticle/:id', [authJwt.verifyToken], article.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteArticle/:id',  [authJwt.verifyToken], article.delete);

    // Получение пользователя по id
    app.get('/api/article/:id',  article.findById);

    // Получение пользователя по фамилии
    app.get('/api/article/title/:title', article.findByTitle);
    
};