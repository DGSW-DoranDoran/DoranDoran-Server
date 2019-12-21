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
        deadline_member: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deadline_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        member_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        current_member_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false,
    });
    
    Group.findGroupInfo = (id) => Group.findOne({
        attributes: ['group_id', 'category_id', 'name', 'content', 'deadline_type', 'deadline_member', 'deadline_time', 'status', 'create_time', 'image', 'founder', 'member_count'],
        where: {
            group_id: id,
          },
    
        raw: true,
    });

    Group.showAllGroup = () => Group.findAll({
        attributes: ['group_id', 'category_id', 'name', 'content', 'deadline_type', 'deadline_member', 'deadline_time', 'status', 'create_time', 'image', 'founder', 'member_count'],

        raw: true,
    });

    Group.createGroupInfo = (group_id, category_id, name, content, deadline_type, deadline_member, deadline_time, status, create_time, image, founder, member_count) => Group.create({
       group_id: group_id,
       category_id: category_id,
       name: name,
       content: content,
       deadline_type: deadline_type,
       deadline_member: deadline_member,
       deadline_time: deadline_time,
       status: status,
       create_time: create_time,
       image: image,
       founder: founder,
       member_count: member_count
    });

    Group.deleteGroupInfo = (group_id) => Group.destroy({
        where: {
            group_id: group_id
        }
     });

    return Group;
}