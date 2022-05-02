module.exports = function (req, res, next) {
    const { fname, lname, uname, pass } = req.body;

    function validUsername(username) {
        return /^\w+([\.-]?\w+)*/.test(username);
    }

    if (req.path === "/register") {
        console.log(!uname.length);
        if (![fname, lname, uname, pass].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validUsername(uname)) {
            return res.json("Invalid Username");
        }
    } else if (req.path === "/login") {
        if (![uname, pass].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validUsername(uname)) {
            return res.json("Invalid Username");
        }
    }

    next();
};