module.exports = (app) => {

    const comment = require('../controller/comment.controller');
    
    // Получение всех пользователей
    app.get('/api/comments', comment.findAll);

    // Добавление пользователя
    app.post('/api/addComment', comment.create);

    // Обновление данных пользователя по id
    app.post('/api/updateComment/:id', comment.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteComment/:id', comment.delete);

    // Получение пользователя по id
    app.get('/api/comment/:id', comment.findById);

};