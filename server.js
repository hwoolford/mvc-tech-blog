const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require("dotenv").config();

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SECRET, 
    cookie: {
      maxAge: 3600000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

app.use(session(sess));

// Static files cache control
const oneDay = 1000 * 60 * 60 * 24; // 24 hours
app.use(express.static(path.join(__dirname, "public"), { maxAge: oneDay }));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const middleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next();
}

app.use(middleware);


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}!`));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });