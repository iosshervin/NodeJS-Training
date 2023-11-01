// const { model } = require('mongoose')
// const express = require('re')

const authJwt = require("../middlewares/authJwt.js");

module.exports = app => {
    const products = require("../controller/product.controller.js"); 
    // access REST API methods(GET,POST,PUT,DELETE)
    var router = require("express").Router();

    // Create a new Products 
    router.post("/", products.create);
    router.get("/create",[authJwt.verifyToken], products.showAll);
    router.put("/updateProduct/:id", products.update);
    router.delete("/deleteProduct/:id", products.delete);
    router.delete("/deleteAllProduct", products.deleteAll);

    app.use("/api/products", router);

    // app.use(function(req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Orgin, Content-Type, Accept"
    //     );
    //     next();
    // });
}