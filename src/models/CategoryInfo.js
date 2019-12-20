module.exports = CategoryInfo = (sequelize, DataTypes) => {
    return sequelize.define('category_info', {
        category_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
}
