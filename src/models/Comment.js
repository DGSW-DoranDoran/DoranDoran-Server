module.exports = CommentInfo = (sequelize, DataTypes) => {
    var date = new Date();

    const Comment = sequelize.define('comment_info', {
        comment_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncreasement: true
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
    }, {
        timestamps: false,
    });

    Comment.getComment = (group_id) => Comment.findAll({
        where: {
            group_id: group_id
        },
        raw: true
    });

    Comment.postComment = (group_id, member_id, comment) => {
        return Comment.create({
            group_id: group_id,
            member_id: member_id,
            content: comment,
            write_time: date
        });
    }

    Comment.deleteComment = (comment_id) => {
        Comment.destroy({
            where: {
                comment_id: comment_id
            }
        })
    }

    return Comment;
}
