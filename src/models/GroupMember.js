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
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        attributes: ['id', 'is_admin', 'member_status', 'group_id', 'member_id'],
        where: {
            group_id: group_id
        }
    });

    GroupMember.join = ( data ) => GroupMember.create({
        isAdmin: data.isAdmin,
        member_status: data.member_status,
        group_id: data.group_id,
        member_id: data.member_id
    });

    return GroupMember;
};