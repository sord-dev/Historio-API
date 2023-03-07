const express = require("express");

const users = require("../config/users.json");

// while i like this code and a user db is great, i think in order to have consistant understanding in the team and also
// structure to the data it's better to do this FIRST in json then we can move over to the db

// const sql = "SELECT * FROM users"
//     const params = []
//     userDB.all(sql, params, (err, rows) => {
//         if (err) {
//             res.status(400).json({"error":err.message});
//             return;
//         }
//         res.json({
//             "message": "sucess",
//             "data": rows
//         })
//     })


// /quiz/{endpoint}
const userLogIn = express.Router();


// get all users FOR TESTING
userLogIn.get("/users", (req, res) => {
  res.status(200).json(users);
});


//get user data IF logged in
userLogIn.get("/me", (req, res) => {
  const { body } = req;

  const user = users.find((user) => user.username === body.username);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(403).send({ error: "data not found" });
  }
});

userLogIn.post("/login", (req, res) => {
    res.status(200).json({message: 'WORK IN PROGRESS'});
})

userLogIn.post("/sign-up", (req, res) => {
    res.status(200).json({message: 'WORK IN PROGRESS'});
})


// post update user data IF logged in
// userLogIn.post("/me", (req, res) => {
//     const { body } = req;
  
//     const user = users.find((user) => user.username === body.username);
  
//     if (user) {
//         // update user
    
//     } else {
//         // deny request
     
//     }
//   });



module.exports = userLogIn;
