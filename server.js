
const express = require('express');
// const session = require('express-session');
const routes = require('./controllers');
const sequelize = require(('./config/connection'));

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(routes);

//turn on connection to db and server, when sync force:true it resets the database, use npm run seed to populate database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});