const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
    const token = jwt.sign({ id: 123 },
        config.secret,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 25 hours
        });

        res.status(200).send({
            id: 123,
            username: "Test123",
            accessToken: token
        });
};