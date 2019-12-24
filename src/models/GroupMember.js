module.exports = (sequelize, DataTypes) => {
    const GroupMember = sequelize.define('GroupMember', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        member_status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    GroupMember.associate = (models) => {
        models.GroupMember.belongsTo(models.Group, {
            foreignKey: 'group_id',
            targetKey: 'id'
        });
    };

    GroupMember.associate = (models) => {
        models.GroupMember.belongsTo(models.Member, {
            foreignKey: 'member_id',
            targetKey: 'id'
        });
    };

    GroupMember.getMembers = (group_id) => GroupMember.findAll({
        where: {
            group_id: group_id
        }
    });

    GroupMember.join = (group_id, member_id, isAdmin, member_status ) => GroupMember.create({
        group_id: group_id,
        member_id: member_id,
        isAdmin: isAdmin,
        member_status: member_status
    });

    return GroupMember;
};