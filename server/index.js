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

    db.query("select * from users where username = ? and password = ?", [username, password], (error, results, fields) => {
        if (results.length > 0) {
            res.send({ message: "This user is already present" })
        } else {
            db.query("Insert into users (username,password) values (?,?)",
                [username, password],
                (error, results, fields) => {
                    res.send({ results, login: true, message: "Signup successful" })
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

    db.query("select * from users where username = ? and password = ?", [username, password], (error, results, fields) => {
        if (error) {
            res.send({ error: error })
        } else {
            if (results.length > 0) {
                res.send({ results, login: true, message: "Login successful" })
            } else {
                res.send({ login: false, message: "Wrong username/password" })
            }
        }

    })
})


app.get("/all", (req, res) => {
    db.query("select * from users", (error, results, fields) => {
        res.send(results)
        // console.log(fields)
    })
})

app.listen(3001, () => {
    console.log("Server Started")
})