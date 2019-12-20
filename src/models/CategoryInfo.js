export const CategoryInfo = (sequelize, DataTypes) => {
    return sequelize.define('category_info', {
        category_id: {
            type: DataTypes.INT(11),
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
}
