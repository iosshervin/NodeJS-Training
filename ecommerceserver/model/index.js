const dbconfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise; //enable promise object db and node

const db = {}; // database connection properties to 
db.mongoose = mongoose;
db.url = dbconfig.url;
db.product = require("./product.model.js")(mongoose);
db.cart = require("./cart.model.js")(mongoose);

module.exports = db;