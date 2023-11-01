const db = require('../model')
const Carts = db.cart;

exports.showAll = (req, res) => {
    Carts.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Products."
            });
        });
};

exports.addToCart = (req, res) => {
    console.log(req.body.productID);
    if (!req.body.productID) {
        res.status(400).send({message: "Product ID cannot be empty!"});
        return;
    }

    const cart = new Carts({
        productID: req.body.productID,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice
    });

    cart.save(cart)
    .then(data => {
        res.send("Add to cart successfully");
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occured while creating the Cart"
        })
    })
};

exports.updateCart = async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    try {
      const cartItem = await Carts.findById(req.params.id).exec();
  
      if (!cartItem) {
        return res.status(404).send({
          message: "Cart item not found."
        });
      }
  
      const productItem = await Product.findById(cartItem.productID).exec();
  
      if (!productItem) {
        return res.status(404).send({
          message: "Product item not found."
        });
      }
  
      const price = productItem.price;

      const quantity = req.params.quantity;
      const totalPrice = price * quantity;
      const updateValues = {
        quantity: quantity,
        totalPrice: totalPrice
      };
  
      const updatedCart = await Carts.findByIdAndUpdate(req.params.id, updateValues, { useFindAndModify: false }).exec();
  
      if (!updatedCart) {
        return res.status(404).send({
          message: `Cannot update Cart with id=${req.params.id}. Maybe Cart was not found!`
        });
      }
  
      res.send({ message: "Cart was updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error updating Cart with id=" + req.params.id
      });
    }
  };

  exports.deleteCartById = (req, res) => {
    const id = req.params.id;
  
    Carts.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
          });
        } else {
          res.send({
            message: "Cart was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cart with id=" + id
        });
      });
  };
  
  
  exports.deleteCart = (req, res) => {
    Carts.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Removed all items from cart successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Products."
        });
      });
  };