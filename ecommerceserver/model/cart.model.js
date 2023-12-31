module.exports = mongoose => {
    var schema = mongoose.Schema (
        {
            productID: String,
            quantity: Number,
            totalPrice: Number
        }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const cart = mongoose.model("carts", schema); // mongobd collection name
    return cart;
};