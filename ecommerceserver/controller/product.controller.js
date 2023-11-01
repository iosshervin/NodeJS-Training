// const { title } = require('process');    
const db = require('../model')
const Products = db.product;

// Mongo table manipulation commands:
// products.find({title: 'M1'})
// Retrieve all product from the database 

exports.showAll = (req, res) => {
    // const Title = req.query.title;
    // var condition = title ? {title: { $regex: new RegExp(title), $options: "i" }
    Products.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Products."
            });
        });
};

// create and save product into database
exports.create = (req, res) => {
    console.log(req.body.title);
    if (!req.body.title) {
        res.status(200).send({ message: "Title cannot be empty!" });
        return;
    }
    // create a product
    const product = new Products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        model: req.body.model,
    });

    product.save(product)
    .then(data => {
        res.send("Products created successfully");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating Products."
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Products.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
          });
        } else {
          res.send({
            message: "Product was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + id
        });
      });
  };
  
  
exports.deleteAll = (req, res) => {
    Products.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Removed all products successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Products."
        });
      });
  };

// Update a Products by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Products with id=${id}. Maybe Products was not found!`
          });
        } else res.send({ message: "Products was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Products with id=" + id
        });
      });
  };
  
// Delete a Products with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Products.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Products with id=${id}. Maybe Products was not found!`
          });
        } else {
          res.send({
            message: "Products was deleted successfully!"
        });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Products with id=" + id
        });
      });
  };

