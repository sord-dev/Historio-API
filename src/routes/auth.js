const express = require("express");
const userLogIn = express.Router();

const userDB = require("../helpers/userDB.js");
md5 = require("md5");


userLogIn.get('/users', (req, res) => {
    const sql = "SELECT * FROM users"
    const params = []
    userDB.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message": "sucess",
            "data": rows
        })
    })
})

module.exports = userLogIn