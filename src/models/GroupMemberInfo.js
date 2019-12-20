module.exports =  GroupMemberInfo = (sequelize, DataTypes) => {
    return sequelize.define('groupMember_info', {
        member_id: {
            type: DataTypes.STRING(30),
            primaryKey: true
        },
        group_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        is_founder: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        member_status: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        member_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    })
}
