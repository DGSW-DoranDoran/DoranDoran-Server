module.exports = GroupInfo = (sequelize, DataTypes) => {
    const Group = sequelize.define('group_info', {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(5000),
            allowNull: true
        },
        deadline_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deadline_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        founder: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        current_member_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        timestamps: false,
    });

    Group.getAllGroups = Group.findAll;

    Group.getCategoryGroups = (category_id) => Group.findAll({
        where: {
            category_id: category_id
        }
    });

    Group.createGroup = (groupInfo) => Group.create({
        category_id: groupInfo.category_id,
        name: groupInfo.name,
        content: groupInfo.content,
        deadline_count: groupInfo.deadline_count,
        deadline_time: groupInfo.deadline_time,
        create_time: new Date(),
        status: 0,
        founder: ""
    });

    Group.modifyGroup = async (groupInfo) => {
        const groupId = groupInfo.group_id;

        delete groupInfo.group_id;

        return Group.update({
            ...groupInfo
        }, {
            where: {
                group_id: groupId,
            },
        })
    }

    return Group;
}