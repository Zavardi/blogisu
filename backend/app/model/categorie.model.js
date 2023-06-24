module.exports = (sequelize, Sequelize) => {
    var Categorie = sequelize.define(
        'categorie', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            categorie_name : {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });

    // Определяем связи таблицы Channel с другими таблицами
    Categorie.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели user): в файле user.model.js
        // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели direction): в файле direction.model.js
        Categorie.hasMany(models.article, {
            foreignKey: 'categorie_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Categorie;
};