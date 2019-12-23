module.exports = (sequelize, DataTypes) => {
    const GroupMember = sequelize.define('GroupMember', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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

    return GroupMember;
};