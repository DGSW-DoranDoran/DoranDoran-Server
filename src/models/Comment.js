module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        member_id: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        models.Comment.belongsTo(models.Group, {
            foreignKey: 'group_id',
            targetKey: 'id'
        });
    };

    return Comment;
};