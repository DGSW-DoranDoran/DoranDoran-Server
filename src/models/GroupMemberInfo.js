module.exports =  GroupMemberInfo = (sequelize, DataTypes) => {
    const member = sequelize.define('groupMember_info', {
        member_id: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        is_allow: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    },{
        timestamps: false,
    });

    member.findAllGroup = (category_id) => sequelize.query(
        `SELECT member_infos.*, groupmember_infos.group_id, groupmember_infos.is_allow
        FROM groupmember_infos
        LEFT JOIN member_infos ON groupmember_infos.member_id = member_infos.member_id;
        ;`
    );

    member.findGroup = (group_id) => sequelize.query(
        `SELECT member_infos.*, groupmember_infos.group_id, groupmember_infos.is_allow
        FROM groupmember_infos
        LEFT JOIN member_infos ON groupmember_infos.member_id = member_infos.member_id
        WHERE groupmember_infos.group_id = ${group_id};
        ;`
    );

    return member;
}
