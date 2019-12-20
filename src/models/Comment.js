module.exports = CommentInfo = (sequelize, DataTypes) => {
    return sequelize.define('comment_info', {
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
        }
    })
}
