const User = require("../models/User.js");
const express = require("express");
const users = require("../config/users.json");
let maxId = users.length; // getting users length to create unique Id.

// /quiz/{endpoint}
const userLogIn = express.Router();

// get all users FOR TESTING
userLogIn.get("/users", (req, res) => {
  res.status(200).json(users);
});

//get user data IF logged in
userLogIn.get("/me", (req, res) => {
  const { body } = req;

  const user = getUser(body.username);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send({ error: "User not found." });
  }
});

userLogIn.post("/login", (req, res) => {
    res.status(200).json({message: 'WORK IN PROGRESS'});
});

userLogIn.post("/sign-up", async (req, res) => {
    try {
        let user = new User (
            req.body.username, 
            req.body.password,
            req.body.statsID);


        // Check for requirement violations.
        let violations = calculateValidationErrors(user);
        if (violations.length > 0)
        {
            return res.status(422).json({ message: [...violations] });
        }
    
        // Extract user creation into a new functiton.
        // Creating user.
        await addUser(user);

        return res.status(200).json({ userId: user.id, message: 'Success.'});
    }
    catch {
        res.status(500).json({message: "An error has occured."});
    }
});

async function addUser(user) {
    maxId++;
    await user.encryptPassword(user.password);
    user.setId(maxId);
    users.push(user);
}

function calculateValidationErrors(user) {
    let arrayOfViolations = []

    if (getUser(user.username) != undefined) {
        arrayOfViolations.push('User already exists');
    }

    if (user.password.length < 5) {
        arrayOfViolations.push('Password too short, minimum 5 characters.');
    }
   
    return arrayOfViolations; // this function returns a list of violations of the requirements we previously set for username and password.
}

function getUser(username) {
    return users.find(user => user.username == username);
}


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
