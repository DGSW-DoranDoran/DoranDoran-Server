module.exports = GroupInfo = (sequelize, DataTypes) => {
    return sequelize.define('group_info', {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        category_id: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        deadline_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deadline_member: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deadline_time: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        create_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
}
