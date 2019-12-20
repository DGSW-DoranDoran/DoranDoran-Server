export const GroupMemberInfo = (sequelize, DataTypes) => {
    return sequelize.define('group_member_info', {
        member_id: {
            type: DataTypes.STRING(30),
            primaryKey: true
        },
        group_id: {
            type: DataTypes.INT(11),
            allowNull: false
        },
        is_founder: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        member_status: {
            type: DataTypes.INT(11),
            allowNull: false
        },
        member_count: {
            type: DataTypes.INT(11),
            allowNull: false
        }
    })
}
