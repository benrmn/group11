const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

// mysql
const pool = mysql.createPool({
    connectionLimit : 10, 
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'group11'

})

//get all users
app.get('', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as user ${connection.threadId}`)

        // query(sqlString, callback)
        connection.query('SELECT * from User', (err, rows) => {
            connection.release() //return connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })

    })

})

// listen on env port or 
app.listen(port, () => console.log(`Listen on port ${port}`))