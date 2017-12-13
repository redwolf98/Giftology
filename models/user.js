module.exports = function(sequelize, DataTypes){
var User = sequelize.define("user",{
    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
    },
    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    photo_url:{
        type: DataTypes.STRING
    }
},
{
    timestamps: false,
    freezeTableName: true
});
    return User;
};