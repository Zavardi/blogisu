module.exports = (app) => {

    const user = require('../controller/user.controller');

    var { authJwt } = require("../middleware");
    
    // Получение всех пользователей
    app.get('/api/users', [authJwt.verifyToken], user.findAll);

    // Добавление пользователя
    app.post('/api/addUser', [authJwt.verifyToken], user.create);

    // Обновление данных пользователя по id
    app.post('/api/updateUser/:id', [authJwt.verifyToken], user.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteUser/:id', [authJwt.verifyToken], user.delete);

    // Получение пользователя по id
    app.get('/api/user/:id', [authJwt.verifyToken], user.findById);

    // Получение пользователя по фамилии
    app.get('/api/user/lastname/:lastname', [authJwt.verifyToken], user.findByLastname);
    
};