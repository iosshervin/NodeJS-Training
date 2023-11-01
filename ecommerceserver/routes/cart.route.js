const authJwt = require("../middlewares/authJwt.js");

module.exports = app => {
    const carts = require("../controller/cart.controller.js"); 
    // access REST API methods(GET,POST,PUT,DELETE)
    var router = require("express").Router();

    // Create a new Products 
    router.get("/", carts.showAll);
    router.post("/addToCart", carts.addToCart);
    router.put("/updateCart/:id/:quantity", carts.updateCart);
    router.delete("/deleteCart/:id", carts.deleteCartById);
    router.delete("/deleteCart", carts.deleteCart);

    app.use("/api/carts", router);
}