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

//login
// app.get("/login", async (req, res) => {
//     try {
//         const allLogin = await pool.query(`SELECT * FROM "User"`);
//         res.json(allLogin.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });
app.delete("/login/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteP_Genre = await pool.query(`DELETE FROM "User" WHERE "User_ID" = $1`, [id]);
        res.json("user was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { uname, pass } = req.body;
        const idLogin = await pool.query(`SELECT * FROM "User" WHERE "Username" = $1 and "Password" = $2`, [uname, pass]);
        res.json(idLogin.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { fname, lname, uname, isadmin, isbanned } = req.body;
        const updateP_Genre = await pool.query(`UPDATE "User" SET "User_Fname" = $1,  "User_Lname" = $2, 
            "Username" = $3, "isBanned" = $4, "isAdmin" = $5 WHERE "Genre_ID" = $6`, [fname, lname, uname, isbanned, isadmin, id]);
        res.json("user was updated");
    } catch (err) {
        console.error(err.message);
    }
});
//create a post
app.post("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {post_text} = req.body;
        const newPost = await pool.query(`INSERT INTO "Post" ("Post_Text", "Genre_ID") VALUES ($1, $2) RETURNING *`, [post_text, id]);

        res.json(newPost.rows);
    }catch (err) {
        console.error(err.message);
    }
});


// app.get("/posts", async(req, res) => {
//     try {
//         const allPosts = await pool.query(`SELECT * FROM "Post"`);

//         res.json(allPosts.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

//get posts from user ID that is logged in
// app.get("/posts/:id", async(req, res) => {
//     try {
//         const { id } = req.params;
//         const allPosts = await pool.query(`SELECT * FROM "Post" WHERE "User_ID" = $1`,[id]);
//         res.json(allPosts.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

app.get("/posts", async(req, res) => {
    try {
        const id = req.query.id;
        // console.log(id)
        const allPosts = await pool.query(`SELECT * FROM "Post" WHERE "User_ID" = $1`,[id]);
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get posts from user ID that is logged in
app.get("/posts/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const allPosts = await pool.query(`SELECT * FROM "Post" WHERE "User_ID" = $1`,[id]);
        res.json(allPosts.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// app.put("/users/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name } = req.body;
//         const updateP_Genre = await pool.query(`UPDATE "Genre" SET "Genre_Name" = $1 WHERE "Genre_ID" = $2`, [name, id]);
//         res.json("pgenre was updated");
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// priv genre

// get posts under genre id
app.get("/genre_posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const idGenre = await pool.query(`SELECT * FROM "Post" WHERE "Genre_ID" = $1`, [id]);
        res.json(idGenre.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// PRIVATE TOPICS
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
        const allP_Genre = await pool.query(`SELECT * FROM "Genre" WHERE "isPrivate" = true`);
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
        // create tmp view query
        const deleteComments = await pool.query(`DELETE FROM "Comment" WHERE "POST_ID" = (SELECT * FROM "Post" WHERE "Genre_ID" = $1)`, [id]);
        const deletePG_Posts = await pool.query(`DELETE FROM "Post" WHERE "Genre_ID" = $1`, [id]);
        const deleteP_Genre = await pool.query(`DELETE FROM "Genre" WHERE "Genre_ID" = $1`, [id]);
        // delete view
        res.json("pgenre was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// PUBLIC TOPICS
app.post("/genre", async (req, res) => {
    try {
        const { name } = req.body;
        const newGenre = await pool.query(`INSERT INTO "Genre" ("Genre_Name", "isPrivate") VALUES ($1, false) RETURNING *`, [name]);
        res.json(newGenre.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

app.get("/genre", async (req, res) => {
    try {
        const allGenre = await pool.query(`SELECT * FROM "Genre" WHERE "isPrivate" = false`);
        res.json(allGenre.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/genre/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const idGenre = await pool.query(`SELECT * FROM "Genre" WHERE "Genre_ID" = $1`, [id]);
        res.json(idGenre.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/genre/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateGenre = await pool.query(`UPDATE "Genre" SET "Genre_Name" = $1 WHERE "Genre_ID" = $2`, [name, id]);
        res.json("genre was updated");
    } catch (err) {
        console.error(err.message);
    }
});

//this is for edit functionality for user posts
app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { post_text } = req.body;
        const updatePost = await pool.query(`UPDATE "Post" SET "Post_Text" = $1 WHERE "Post_ID" = $2`, [post_text, id]);
        res.json("post was updated");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/genre/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteComments = await pool.query(`DELETE FROM "Comment" WHERE "Post_ID" = (SELECT * FROM "Post" WHERE "Genre_ID" = $1)`, [id]);
        const deleteG_Posts = await pool.query(`DELETE FROM "Post" WHERE "Genre_ID" = $1`, [id]);
        const deleteGenre = await pool.query(`DELETE FROM "Genre" WHERE "Genre_ID" = $1`, [id]);
        res.json("genre was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteComments = await pool.query(`DELETE FROM "Comment" WHERE "Post_ID" = $1`, [id]);
        const deletePost = await pool.query(`DELETE FROM "Post" WHERE "Post_ID" = $1`, [id]);
        res.json("post was deleted");
      } catch (err) {
        console.error(err.message);
    }
});

// comments under a post id
app.post("/comment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const newComment = await pool.query(`INSERT INTO "Comment" ("Comment_Text", "Post_ID") VALUES ($1, $2) RETURNING *`, [text, id]);
        res.json(newComment.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

app.get("/comment/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const allComments = await pool.query(`SELECT * FROM "Comment" WHERE "Post_ID" = $1`, [id]);
        res.json(allComments.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/comment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const updateComment = await pool.query(`UPDATE "Comment" SET "Comment_Text" = $1 WHERE "Comment_ID" = $2`, [text, id]);
        res.json("Comment was updated");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/comment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteComment = await pool.query(`DELETE FROM "Comment" WHERE "Comment_ID" = $1`, [id]);
        res.json("Comment was deleted");

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