const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connections');

//const db = require('../db');
class Books extends Model {}

Books.init(
    {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    }//,
    //description: {
        //type: DataTypes.STRING
    //}
},
{ 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true
});

module.exports = Books;