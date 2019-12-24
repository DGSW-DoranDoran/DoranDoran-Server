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

    Comment.getComments = (group_id) => Comment.findAll({
        where: {
            group_id: group_id
        }
    });

    Comment.write = (data) => Comment.create({
        group_id: data.group_id,
        member_id: data.member_id,
        comment: data.comment
    });

    Comment.delete = (comment_id) => Comment.destroy({
        where: {
            id: comment_id
        }
    });

    return Comment;
};