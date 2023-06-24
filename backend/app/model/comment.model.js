module.exports = (sequelize, Sequelize) => {
    var Comment = sequelize.define(
        'comment', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            author_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            article_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            comment_text: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
        });

    // Определяем связи таблицы Comment с другими таблицами
    Comment.associate = (models) => {

        Comment.belongsTo(models.user, {
            foreignKey: 'author_id'
        });
        Comment.belongsTo(models.article, {
            foreignKey: 'article_id'
        });
    };

    return Comment;
};