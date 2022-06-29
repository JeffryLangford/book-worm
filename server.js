const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require(('./config/connection'));
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret:'fire photon torpedoes',
    cookie:{},
    resave: false,
    saveUninitialized:true,
    store: new SequelizeStore({
        db:sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public'))); // <-- express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets

//turn on routes
app.use(routes);
//turn on connection to db and server, .sync is like EF initialize changes from model to db
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});