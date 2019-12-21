module.exports = CommentInfo = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment_info', {
        comment_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        member_id: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        write_time: {
            type: DataTypes.DATE,
            primaryKey: false
        },
    },{
        timestamps: false,
    });

    Comment.getComment = (group_id) => Comment.findAll({
        where: {
            group_id: group_id
        },
        raw: true
    });

    return Comment;
}
