// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");
module.exports = function(sequelize, DataTypes){

    var Gift = sequelize.define("gift",{
        id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        userID:{
            type: DataTypes.INTEGER
        },
        relationID:{
            type: DataTypes.INTEGER
        },
        name:{
            type: DataTypes.STRING
        },
        price:{
            type:DataTypes.DECIMAL
        },
        description:{
            type: DataTypes.STRING
        },
        image_url:{
            type: DataTypes.STRING
        },
        web_url:{
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName:"gift"
    });
        return Gift;
};