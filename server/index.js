const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()

// Add middleware

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123456",
    database: "userLogin"
})

// Create Apis

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("select * from users where username = ? and password = ?", [username, password], (err, result) => {
        if (result.length > 0) {
            res.send({ message: "This user is already present" })
        } else {
            db.query("Insert into users (username,password) values (?,?)",
                [username, password],
                (err, result) => {
                    res.send({ result, login: true, message: "Signup successful" })
                    // res.send(result)

                })
            // console.log(data)
        }
    })


})

// API for login
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("select * from users where username = ? and password = ?", [username, password], (err, result) => {
        if (err) {
            res.send({ error: err })
        } else {
            if (result.length > 0) {
                res.send({ result, login: true, message: "Login successful" })
            } else {
                res.send({ login: false, message: "Wrong username/password" })
            }
        }

    })
})

app.listen(3001, () => {
    console.log("Server Started")
})