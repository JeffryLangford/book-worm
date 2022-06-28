const { Model, DataTypes } = require("sequelize");
const { User } = require('../models/User');
//const { FOREIGNKEYS } = require("sequelize/types/query-types");
const sequelize = require('../config/connection');

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
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    
    //,
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