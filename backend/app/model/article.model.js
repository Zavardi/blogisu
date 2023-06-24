module.exports = (sequelize, Sequelize) => {
    var Article = sequelize.define(
        'article',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(50000),
                allowNull: false
            },
            categorie_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            author_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });

    Article.associate = (models) => {

        Article.belongsTo(models.categorie, {
            foreignKey: 'categorie_id'
        });
        Article.hasMany(models.comment, {
            foreignKey: 'article_id'
        });
        Article.belongsTo(models.user, {
            foreignKey: 'author_id'
        });
    };
    return Article;
};