module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        id: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        gender: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        grade: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        position: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    });

    Member.associate = (models) => {
        models.Member.hasMany(models.GroupMember);
    };

    Member.DuplicateCheck = (id) => Member.findOne({
        where: {
            id: id
        }
    });

    Member.login = (id, password) => Member.findOne({
        where: {
            id: id,
            password: password
        }
    });

    Member.register = ( data ) => Member.create({
        id: data.id,
        password: data.password,
        name: data.name,
        phone: data.phone,
        gender: data.gender,
        grade: data.grade,
        position: data.position,
        image: data.image
    });

    return Member;
};