export const CommentInfo = (sequelize, DataTypes) => {
    return sequelize.define('comment_info', {
        comment_id: {
            type: DataTypes.INT(11),
            primaryKey: true
        },
        member_id: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        group_id: {
            type: DataTypes.INT(11),
            primaryKey: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        write_time: {
            type: DataTypes.DATETIME,
            primaryKey: false
        }
    })
}
