module.exports = (app) => {

    const categorie = require('../controller/categorie.controller');
    
    // Получение всех пользователей
    app.get('/api/categories', categorie.findAll);

    // Добавление пользователя
    app.post('/api/addCategorie', categorie.create);

    // Обновление данных пользователя по id
    app.post('/api/updateCategorie/:id', categorie.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteCategorie/:id', categorie.delete);

    // Получение пользователя по id
    app.get('/api/categorie/:id', categorie.findById);

    // Получение пользователя по фамилии
    app.get('/api/categorie/categorie_name/:categorie_name', categorie.findByCategorie_name);

};