const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { STRING } = require('sequelize');
//const bcrypt = require('bcrypt'); <-- require bcrypt goes here -- LATER

class User extends Model {
    /*
    LATER-
     checkPassword(loginPw){
        return bcrypt.compareSync(loginPw,this.password); // <-- compares plain text password with hash if the pair match from db record, success.
    }
    */
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        /*
          hooks: { // <-- hooks placement to encrypt passwords for create and update of user passwords
                //setup beforeCreate lifecycle "hook" functionality for before create and before update
                async beforeCreate(newUserData) {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
                async beforeUpdate(updatedUserData) {
                  updatedUserData.password=await bcrypt.hash(updatedUserData.password, 10);
                }
            },
        */
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;

