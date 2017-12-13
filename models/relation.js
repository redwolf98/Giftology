module.exports = function(sequelize, DataTypes){

    var Relation = sequelize.define("relation",{
        id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        userID:{
            type:DataTypes.INTEGER
        },
        firstName:{
            type:DataTypes.STRING
        },
        lastName:{
            type:DataTypes.STRING
        },
        relationship:{
            type:DataTypes.STRING
        },
        birthDate:{
            type:DataTypes.DATE
        },
        address:{
            type:DataTypes.STRING
        },
        photo_url:{
            type:DataTypes.STRING
        }
    });

 return Relation;

};