// const express = require('express');
// const cors = require('cors');

// const app = express(); // to access the rest api
// const db = require('./model');

// app.use(express.json());

// db.mongoose
//     .connect(db.url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("Connected to database!");
//     })
//     .catch(err => {
//         console.log("Cannot connect to database!", err);
//         process.exit();
//     });

// // access API URL 
// app.get("/", (req, res) => {
//     res.json({message: "Welcome"});
// });

// // set port, listen for requests 
// const PORT = process.env.PORT || 8082

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });

const express = require('express');
const cors = require('cors');

const app = express(); // to access REST API
app.use(express.json());

// To access the API URL
app.get("/", (req, res) => {
    res.json({ message: "Welcome"});
});



// Setting up port for listening requests
require("./routes/product.route.js")(app); // for accessing product routes
require("./routes/cart.route.js")(app); // for accessing cart routes
require("./routes/auth.routes.js")(app); // for accessing auth routes

module.exports = app => {
const products = require("../controller/product.controller.js");
const carts = require("../controller/cart.controller.js");
//access REST API methods(GET,POST,PUT,DELETE)
var router = require("express").Router();
// Create new Products & Carts
router.get("/", products.showAll);
app.use("/api/products", router);
app.use("/api/carts", router);
};


const PORT = process.env.PORT || 8093;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


const db = require("./model");


db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(err => {
        console.log("Cannot connect to database!:", err);
        process.exit();
    })

// const express = require('express');
// const app = require('')
// const router = express.router()