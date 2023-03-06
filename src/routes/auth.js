const express = require("express");
const UserModel = require("../models/UserModel.js");
const userLogIn = express.Router();

const userDB = require("../helpers/userDB.js");
const bcrypt = require("bcrypt");


userLogIn.get('/users', (req, res) => {
    const sql = "SELECT * FROM users"
    const params = []
    userDB.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    })
})

userLogIn.post('/newUser', (req, res) => {
    let errors = [];
    const userData = {"name": req.body.name, "password": req.body.password, "statsId": req.body.statsId}
    const newUser = UserModel(userData)
    if (!newUser) {
        errors.push("Please provide all required details.")
    }
    if (errors.length) {
        res.status(400).json({"error": errors});
        return;
    }
    let statsId;
    if (newUser.statsId === null) {
        statsId = 0
    }
    else {
        statsId = req.body.statsId
    }
    const sql = "INSERT INTO users (id, username, password, statsId) VALUES (?,?,?,?)"
    const params = [newUser.id, newUser.name, newUser.password, statsId]
    userDB.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": newUser,
            "id": this.lastID
        })
    })
})


module.exports = userLogIn