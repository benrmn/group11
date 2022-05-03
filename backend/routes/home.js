const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    try {
        const user = await pool.query(`SELECT * FROM "User" WHERE "User_ID" = $1`, [req.user]);
        res.json(user.rows[0]);
    } catch (err) {
        console.errpr(err.message);
        res.status(500).json("server error");
    }
});
module.exports = router;