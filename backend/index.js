const express = require('express')
const cors = require('cors');
const routesHandler = require('./routes/handler');
require('dotenv').config();

const { Pool, Client } = require("pg");
//const db = new Pool();

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const app = express()

app.use(express.urlencoded({ extended: false }));
//middleware
app.use(cors());
app.use(express.json()); //req.body

pool.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log("Connected to database!");
    // pool.end();
});

//create a post

app.post("/posts", async(req,res) => {
    try {
        const {post_text} = req.body;
        const newPost = await pool.query(`INSERT INTO "Post" ("Post_Text") VALUES ($1) RETURNING *`, [post_text]);

        res.json(newPost.rows[0]);
    }catch (err) {
        console.error(err.message);
    }
})

app.get("/posts", async(req, res) => {
    try {
        const allPosts = await db.query("SELECT * FROM Post");
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// priv genre
app.post("/priv_genre", async (req, res) => {
    try {
        const { name } = req.body;
        const newP_Genre = await pool.query(`INSERT INTO "Genre" ("Genre_Name", "isPrivate") VALUES ($1, true) RETURNING *`, [name]);
        res.json(newP_Genre.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

app.get("/priv_genre", async (req, res) => {
    try {
        const allP_Genre = await pool.query(`SELECT * FROM "Genre"`);
        res.json(allP_Genre.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/priv_genre/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const idP_Genre = await pool.query(`SELECT * FROM "Genre" WHERE "Genre_ID" = $1`, [id]);
        res.json(idP_Genre.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/priv_genre/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateP_Genre = await pool.query(`UPDATE "Genre" SET "Genre_Name" = $1 WHERE "Genre_ID" = $2`, [name, id]);
        res.json("pgenre was updated");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/priv_genre/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteP_Genre = await pool.query(`DELETE FROM "Genre" WHERE "Genre_ID" = $1`, [id]);
        res.json("pgenre was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// (async () => {
//     const client = await pool.connect();
//     var query = `INSERT INTO "User" ("User_ID", "isAdmin", "isBanned", "Username", "Password", "User_Fname", "User_Lname") VALUES(3, true, false, 'shrek2', 'is', 'best', 'movie')`;
//     client.query(query, (err, res) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         for (let row of res.rows) {
//             console.log(row);
//         }
//         client.end();
//     });
// })();

// Listen on enviroment port or 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`))



