module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    });

    Category.associate = (models) => {
        models.Category.hasMany(models.Group);
    };

    return Category;
};