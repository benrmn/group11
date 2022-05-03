const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const auth = require("../middleware/auth");

//register
router.post("/register", validInfo, async (req, res) => {
    try {
        // get req body
        const { fname, lname, uname, pass } = req.body;
        // check if user exist
        const user = await pool.query(`SELECT * FROM "User" WHERE "Username" = $1`, [uname]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }
        //bcrypt
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPass = await bcrypt.hash(pass, salt);

        // enter user user to db
        const newUser = await pool.query(`INSERT INTO "User" ("User_Fname", "User_Lname", "Username", "Password", "isBanned", "isAdmin") VALUES ($1, $2, $3, $4, false, true) RETURNING *`, [fname, lname, uname, bcryptPass]);

        const token = jwtGenerator(newUser.rows[0].User_ID);
        res.json({ token })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login
router.post("/login", validInfo, async (req, res) => {
    try {
        // destructure req body
        const { uname, pass } = req.body;
        // check if user doesnt exist
        const user = await pool.query(`SELECT * FROM "User" WHERE "Username" = $1`, [uname]);
        // check if incoming pass is valid
        if (user.rows.length === 0) {
            return res.status(401).json("Pass is incorrect");
        }
        //decrypt
        const validPass = await bcrypt.compare(pass, user.rows[0].Password);
        console.log(validPass);
        if (!validPass) {
            return res.status(401).json("Pass is incorrect");
        }
        const token = jwtGenerator(user.rows[0].User_ID);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/verify", auth, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;