var db = require('../config/db.config.js');
var Article = db.article;
var globalFunctions = require('../config/global.functions.js');

// Получение всех пользователей
exports.findAll = (req, res) => {
    Article.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    Article.create({
        title: req.body.title,
        categorie_id: req.body.categorie_id,
        author_id: req.body.author_id,
        content: req.body.content
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    Article.update({
        title: req.body.title,
        categorie_id: req.body.categorie_id,
        author_id: req.body.author_id,
        content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Удаление пользователя по id
exports.delete = (req, res) => {
    Article.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных пользователя по id
exports.findById = (req, res) => {
    Article.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных пользователя по фамилии
exports.findByTitle = (req, res) => {
    Article.findAll({
        where: {
            title: req.params.title
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};