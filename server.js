// const path = require("path");
// const express = require("express");
// const exphbs = require("express-handlebars");
// const session = require("express-session");
// const helpers = require("./utils/helpers");

// // Sequelize ORM
// const sequelize = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const sess = {
//   secret: "unauthorized credentials",
//   cookie: { maxAge: 1000 * 60 * 100 },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };
// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(session(sess));

// const hbs = exphbs.create({ helpers });

// // Handlebars.js template engine


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");
// app.use(require("./controllers"));

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`We will eat ass to pass!`));
// });

const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers.js');
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'pay them bills hoe',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));

app.use(routes);

sequelize.sync({ force: false }).then (() => {
    app.listen(PORT, () => console.log('Now listening Cat Daddy!'));
});

// https://awtrekkie.herokuapp.com/
