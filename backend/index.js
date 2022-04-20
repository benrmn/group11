const express = require('express')
const cors = require('cors');
require('dotenv').config();

const mysql = require('mysql')

const { Pool, Client } = require("pg");

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// const app = express()

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); 

// app.use(cors());
(async () => {
    const client = await pool.connect();
    var query = `INSERT INTO "User" ("User_ID", "isAdmin", "isBanned", "Username", "Password", "User_Fname", "User_Lname") VALUES(3, true, false, 'shrek2', 'is', 'best', 'movie')`;
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        for (let row of res.rows) {
            console.log(row);
        }
        client.end();
    });
})();

// Listen on enviroment port or 5000
const port = process.env.PORT || 5000;

//app.listen(port, () => console.log(`Listening on port ${port}`))
