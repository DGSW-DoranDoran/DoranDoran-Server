module.exports =  MemberInfo = (sequelize, DataTypes) => {
    const Member = sequelize.define('member_info', {
        member_id: {
            type: DataTypes.STRING(30),
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        position: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        grade: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        gender: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    },{
        timestamps: false,
    });

    Member.findMemberForLogin = (id, pw) => Member.findOne({
        attributes: ['member_id', 'name', 'position', 'grade', 'gender', 'phone_number', 'image'],
        where: {
            member_id: id,
            password: pw,
          },
    
        raw: true,
    });

    return Member;
}
