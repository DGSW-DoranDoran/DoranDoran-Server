export const MemberInfo = (sequelize, DataTypes) => {
    return sequelize.define('member_info', {
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
            type: DataTypes.INT(11),
            allowNull: false
        },
        gender: {
            type: DataTypes.INT(11),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    })
}
