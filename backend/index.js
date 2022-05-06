// Dean, Kiara, Jay, and Ben all worked on this file
const express = require('express')
const cors = require('cors');
require('dotenv').config();

const { Pool, Client } = require("pg");


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

/*


         -------   LOGIN STUFF  -------


*/

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const idLogin = await pool.query(`SELECT * FROM "User" WHERE "Username" = $1 and "Password" = $2`, [username, password]);
        console.log(idLogin);
        return res.json(idLogin.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/register", async (req, res) => {
    try {
        // get req body
        const { fname, lname, uname, pass } = req.body;
        // check if user exist
        const user = await pool.query(`SELECT * FROM "User" WHERE "Username" = $1`, [uname]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }

        // enter user user to db
        const newUser = await pool.query(`INSERT INTO "User" ("User_Fname", "User_Lname", "Username", "Password", "isBanned", "isAdmin") 
            VALUES ($1, $2, $3, $4, false, false) RETURNING *`, [fname, lname, uname, pass]);

        res.json(newUser.rows[0])

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.delete("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query(`DELETE FROM "User" WHERE "User_ID" = $1`, [id]);
        res.json("user was deleted");
    } catch (err) {
        console.error(err.message);
    }
});


// app.put("/login/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { fname, lname, uname, isadmin, isbanned } = req.body;
//         const updateUser = await pool.query(`UPDATE "User" SET "User_Fname" = $1,  "User_Lname" = $2, 
//             "Username" = $3, "isBanned" = $4, "isAdmin" = $5 WHERE "User_ID" = $6`, [fname, lname, uname, isbanned, isadmin, id]);
//         res.json("user was updated");
//     } catch (err) {
//         console.error(err.message);
//     }
// });

app.put("/user/:id", async (req, res) => {
    // console.log("102")
    try {
        const { id } = req.params;
        const { name, field } = req.body;
        if(field=="User_Fname"){
            const updateUser = await pool.query(`UPDATE "User" SET "User_Fname" = $1 WHERE "User_ID" = $2`, [ name, id]);}
        if(field=="User_Lname"){
            const updateUser = await pool.query(`UPDATE "User" SET "User_Lname" = $1 WHERE "User_ID" = $2`, [ name, id]);}
        if(field=="Username"){
            const updateUser = await pool.query(`UPDATE "User" SET "Username" = $1 WHERE "User_ID" = $2`, [ name, id]);}
        res.json("user was updated");
    } catch (err) {
        console.error(err.message);
    }
});

/*


         -------   Announcement STUFF  -------


*/
app.post("/announcement", async (req, res) => {
    try {
        //const { id } = req.params;
        const {text} = req.body;
        console.log(text);
        const newAnnouncement = await pool.query(`INSERT INTO "Announcement" ("Announcement_Text") VALUES ($1) RETURNING *`, [text]);

        res.json(newAnnouncement.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/announcement", async (req, res) => {
    try {
        const allAnnouncements = await pool.query(`SELECT * FROM "Announcement" `);
        res.json(allAnnouncements.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/announcement/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAnnouncement = await pool.query(`DELETE FROM "Announcement" WHERE "Announcement_ID" = $1`, [id]);
        // delete view
        res.json("announcement was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/announcement/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { announcements } = req.body;
        const updateAnnouncement = await pool.query(`UPDATE "Announcement" SET "Announcement_Text" = $1 WHERE "Announcement_ID" = $2`, [announcements, id]);
        res.json("announcement text was updated");
    } catch (err) {
        console.error(err.message);
    }
});



/*


         -------   POST STUFF  -------
        Kiara feature set

*/


// app.get("/posts", async(req, res) => {
//     try {
//         const allPosts = await pool.query(`SELECT * FROM "Post"`);

//         res.json(allPosts.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

app.post("/posts/:id/:user_id", async (req, res) => {
    try {
        const { id, user_id } = req.params;
        const { post_text, Username } = req.body;
        const newPost = await pool.query(`INSERT INTO "Post" ("Post_Text", "Genre_ID", "User_ID", "Username") VALUES ($1, $2, $3, $4) RETURNING *`, [post_text, id, user_id, Username]);

        res.json(newPost.rows);
    }catch (err) {
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

// app.get("/posts", async(req, res) => {
//     try {

//         const id = req.query.id;
//         // console.log(id)
//         const allPosts = await pool.query(`SELECT * FROM "Post" WHERE "User_ID" = $1`,[id]);
//         res.json(allPosts.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

//get posts from user ID that is logged in
app.get("/posts/:user_id", async(req, res) => {
    try {
        const { user_id } = req.params;
        const allPosts = await pool.query(`SELECT * FROM "Post" WHERE "User_ID" = $1`,[user_id]);
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/comment_post/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const commentPosts = await pool.query(`SELECT * FROM "Post" WHERE "Post_ID" = $1`, [id]);
        res.json(commentPosts);
    } catch (err) {
        console.error(err.message);
    }
});

/*


         -------   PRIV GENRE STUFF  -------
         Ben feature set


*/

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
        const deleteComments = await pool.query(`DELETE FROM "Comment"
        WHERE "Comment_ID" IN (
            SELECT "Comment_ID" FROM(
            SELECT "Comment_ID","Post_ID","Genre_ID" FROM "Comment"
            LEFT JOIN "Post" Using("Post_ID")
            WHERE "Genre_ID" = $1
        ) AS R1)`, [id]);
        const deletePG_Posts = await pool.query(`DELETE FROM "Post" WHERE "Genre_ID" = $1`, [id]);
        const deleteP_Genre = await pool.query(`DELETE FROM "Genre" WHERE "Genre_ID" = $1`, [id]);
        // delete view
        res.json("pgenre was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

/*


         -------   PUBLIC TOPICS STUFF  -------
         Dean feature set


*/
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

app.delete("/genre/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteComments = await pool.query(`DELETE FROM "Comment"
        WHERE "Comment_ID" IN (
            SELECT "Comment_ID" FROM(
            SELECT "Comment_ID","Post_ID","Genre_ID" FROM "Comment"
            LEFT JOIN "Post" Using("Post_ID")
            WHERE "Genre_ID" = $1
        ) AS R1)`, [id]);
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
app.post("/comment/:id/:user_id", async (req, res) => {
    try {
        const { id, user_id } = req.params;
        const { text, Username } = req.body;
        const newComment = await pool.query(`INSERT INTO "Comment" ("Comment_Text", "Post_ID", "User_ID", "Username") VALUES ($1, $2, $3, $4) RETURNING *`, [text, id, user_id, Username]);
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

app.get("/user_comment/:user_id", async (req, res) => {
    try {

        const { user_id } = req.params;
        const allComments = await pool.query(`SELECT * FROM "Comment" WHERE "User_ID" = $1`, [user_id]);
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

/*


         -------   Likes STUFF  -------
         Ben feature set


*/
// app.get("/like/:post_id", async (req, res) => {
//     try {
//         const { post_id } = req.params;
//         const newLike = await pool.query(`SELECT "Num_likes" FROM "Post" WHERE "Post_ID" = $1`, [post_id]);
//         res.json(newLike.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

app.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await pool.query
            (`SELECT "Num_likes", "Username", "Post_Text", "isPrivate"
            FROM "Post" 
            FULL OUTER JOIN "Genre" USING ("Genre_ID") WHERE "isPrivate" = false ORDER BY "Num_likes" DESC`);
        res.json(leaderboard.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/like/:post_id", async (req, res) => {
    try {
        const { post_id } = req.params;
        const newLike = await pool.query(`UPDATE "Post" SET "Num_likes" = "Num_likes" + 1 WHERE "Post_ID" = $1`, [post_id]);
        res.json(newLike.rows[0]);
        console.log("new like");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/dislike/:post_id", async (req, res) => {
    try {
        const { post_id } = req.params;
        const deleteLike = await pool.query(`UPDATE "Post" SET "Num_likes" = "Num_likes" - 1 WHERE "Post_ID" = $1`, [post_id]);
        res.json("Like was deleted");

    } catch (err) {
        console.error(err.message);
    }
});

/*


         -------   Blacklist STUFF  -------
         Jay feature set


*/
app.get("/blacklist", async (req, res) => {
    try {
        const banUser = await pool.query(`SELECT "Username" FROM "User" WHERE "isBanned" = true`);
        res.json(banUser.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/unblacklist", async (req, res) => {
    try {
        const unbanUser = await pool.query(`SELECT "Username" FROM "User" WHERE "isBanned" = false`);
        res.json(unbanUser.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/blacklist/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const banUser = await pool.query(`UPDATE "User" SET "isBanned" = true WHERE "Username" = $1`, [username]);
        res.json(banUser.rows[0]);
        console.log("banned user");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/unblacklist/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const unbanUser = await pool.query(`UPDATE "User" SET "isBanned" = false WHERE "Username" = $1`, [username]);
        res.json(unbanUser.rows[0]);
        console.log("unbanned user");
    } catch (err) {
        console.error(err.message);
    }
});

/*


         -------   Admin STUFF  -------
         Jay feature set


*/
app.get("/admin", async (req, res) => {
    try {
        const adminUser = await pool.query(`SELECT "Username" FROM "User" WHERE "isAdmin" = true`);
        res.json(adminUser.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/unadmin", async (req, res) => {
    try {
        const unadminUser = await pool.query(`SELECT "Username" FROM "User" WHERE "isAdmin" = false`);
        res.json(unadminUser.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/admin/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const adminUser = await pool.query(`UPDATE "User" SET "isAdmin" = true WHERE "Username" = $1`, [username]);
        res.json(adminUser.rows[0]);
        console.log("banned user");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/unadmin/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const unadminUser = await pool.query(`UPDATE "User" SET "isAdmin" = false WHERE "Username" = $1`, [username]);
        res.json(unadminUser.rows[0]);
        console.log("unbanned user");
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