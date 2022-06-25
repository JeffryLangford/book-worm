const Sequalize = require('sequelize');
require('dotenv').config();

//create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequalize('bookworm', 'root', 'Oscar25!',{
    host:'localhost',
    dialect: 'mysql',
    port: '3306',
    logging:false //<-- TURNS OFF VERBOSE SQL LOGGING!!!
});

//Heroku
// let sequelize;
// if (process.env.JAWSDB_URL) {
//     sequalize = new Sequalize(process.env.JAWSDB_URL);
// } else {
//     sequelize = new Sequalize(process.env.DB_NAME, process.env.DB_USER.process.env.DB_Password, {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306
//     });
// }


module.exports= sequelize;