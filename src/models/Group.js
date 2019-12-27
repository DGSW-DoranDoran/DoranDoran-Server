module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deadline_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        member_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        deadline_member_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    Group.associate = (models) => {
        models.Group.belongsTo(models.Category, {
            foreignKey: 'category_id',
            targetKey: 'id'
        });
    };

    Group.associate = (models) => {
        models.Group.belongsTo(models.Member);
    };

    Group.associate = (models) => {
        models.Group.hasMany(models.Comment);
    };

    Group.associate = (models) => {
        models.Group.hasMany(models.GroupMember);
    };

    Group.getAllGroups = () => Group.findAll();

    Group.getCategoryGroups = (category_id) => Group.findAll({
        where: {
            category_id: category_id
        }
    });

    Group.getGroupInfo = (group_id) => Group.findOne({
        where: {
            id: group_id
        }
    });

    Group.createGroup = (data, id) => Group.create({
        name: data.name,
        content: data.content,
        create_time: new Date(),
        deadline_time: data.deadline_time,
        deadline_member_count: data.deadline_member_count,
        image: data.image,
        category_id: data.category_id,
        founder: id
    });

    Group.modify = (data) => Group.update({
        name: data.name,
        content: data.content,
        deadline_time: data.deadline_time,
        deadline_member_count: data.deadline_member_count,
        image: data.image,
        category_id: data.category_id
    }, {
        where: {
            id: data.group_id
        }
    });

    Group.delete = (group_id) => Group.destroy({
        where: {
            id: group_id
        }
    });

    Group.findGroupFounder = (group_id) => Group.findOne({
        attributes: ['founder'],
        where: {
            id: group_id,
          },
    
        raw: true,
    });

    Group.findMemberCount = (group_id) => Group.findOne({
        attributes: ['member_count'],
        where: {
            id: group_id,
        },

        raw: true,
    })

    Group.plusMemberCount = (group_id, count) => Group.update({
        member_count: count
    }, {
        where: {
            id: group_id
        },

        raw: true,
    });

    Group.findDeadlineCount = (group_id) => Group.findOne({
        attributes: ['deadline_member_count'],
        where: {
            id: group_id,
        },

        raw: true,
    })

    Group.findStatus = (group_id) => Group.findOne({
        attributes: ['status'],
        where: {
            id: group_id,
        },

        raw: true,
    })

    Group.lockGroup = (group_id) => Group.update({
        status: 1
    }, {
        where: {
            id: group_id,
        },

        raw: true,
    })

    Group.checkFounder = async (group_id, member_id) => {
        try {
            const checkValue = await Group.findOne({
                where: {
                    id: group_id,
                    founder: member_id
                }
            });

            console.log(!checkValue);

            if (checkValue) {
                return null;
            }

            return true;
        } catch (error) {
            console.log(error);
        }
    }

    Group.uncompleted = async () => Group.findAll({
        where: {
            status: 0
        }
    });

    Group.changeStatus = async (group_id) => Group.update({
        status: 1
    }, {
        where: {
            id: group_id
        }
    })

    return Group;
};