const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(User_ID) {
    const payload = {
        user: User_ID
    }
    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = jwtGenerator;