module.exports = function(sequelize, DataTypes){

var List_Recipient = sequelize.define("list_recipient",{
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
    email:{
        type: DataTypes.STRING
    },
    photo_url:{
        type: DataTypes.STRING
    },
    haveSentEmail:{
        type: DataTypes.BOOLEAN
    }
},
{
    timestamps: false,
    freezeTableName: true,
    tableName:"list_recipient"
});
  return List_Recipient;  
};