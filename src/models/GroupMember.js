module.exports = (sequelize, DataTypes) => {
    const GroupMember = sequelize.define('GroupMember', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        isAdmin: {
            field: 'is_admin',
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

    GroupMember.getMyInfo = (member_id) => GroupMember.findAll({
        attributes: ['is_admin', 'member_status', 'group_id'],
        where: {
            member_id: member_id
        }
    });

    GroupMember.join = ( data ) => GroupMember.create({
        isAdmin: data.isAdmin,
        member_status: data.member_status,
        group_id: data.group_id,
        member_id: data.member_id
    });

    GroupMember.checkDistinct = async (group_id, member_id) => {
        try {
            const checkValue = await GroupMember.findAll({
                where: {
                    group_id,
                    member_id,
                },
                raw: true,
            });
    
            if (checkValue.length > 0) {
                return false;
            }

            return true;
        } catch (error) {
            msg = "서버 에러";

            console.log(colors.red('ServerError: ' + error));

            result = {
                status: 500,
                message: msg
            };

            return result;
        };
    }

    GroupMember.updateMemberStatus = async (group_id, member_id) => {
        try {
            const result = await GroupMember.findOne({
                where: {
                    group_id,
                    member_id,
                },
            });
    
            await GroupMember.update({
                member_status: 1
            }, {
                where: {
                    id: result.id,
                },
    
                raw: true,
            });
        } catch (error) {
            msg = "서버 에러";

            console.log(colors.red('ServerError: ' + error));

            result = {
                status: 500,
                message: msg
            };

            return result;
        };
    }

    return GroupMember;
};