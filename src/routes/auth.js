const User = require("../models/User.js");
const express = require("express");
const bcrypt = require("bcrypt");
const updateXP = require("../helpers/updateXP")
const {
  users,
  stats,
  getUser,
} = require("../helpers/UserServices.js");
const Stat = require("../models/Stat.js");

let maxId = users.length; // getting users length to create unique Id.
let maxStatsId = stats.length; // getting users length to create unique Id.

// /quiz/{endpoint}
const userLogIn = express.Router();

// get all users FOR TESTING
userLogIn.get("/users", (req, res) => {
  res.status(200).json(users);
});


//get user data IF logged in
userLogIn.get("/me", (req, res) => {
  const { headers } = req;

  const stat = stats.find((stat) => stat.statsID == headers.authorization);
  const user = users.find((stat) => stat.statsID == headers.authorization);

  if (!stat || !user) {
    res.status(404).send({ error: "User not found." });
  } else {
    const response = {
      username: user.username,
      stats: stat,
    };

    res.status(200).json(response);
  }
});

// Increase user XP on correct answer, respond with updated XP.
userLogIn.patch("/me", (req, res) => {
  const { body } = req;
  const user = getUser(body.username);
  if (user) {
    res.status(200).json(updateXP(user.statsID));
  } else {
    res.status(404).send({ error: "User not found." });
  }
});

userLogIn.post("/login", async (req, res) => {
  const user = getUser(req.body.username);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({ ...user, password: null });
    } else {
      res.status(400).json({ message: "Wrong password. Try again." });
    }
  } catch (error) {
    res.status(417).json({ message: error });
  }
});

userLogIn.post("/sign-up", async (req, res) => {
  try {
    let user = new User(req.body.username, req.body.password);
    let userStats = new Stat();

    // Check for requirement violations.
    let violations = calculateValidationErrors(user);
    if (violations.length > 0) {
      return res.status(422).json({ message: [...violations] });
    }

    // Extract user creation into a new functiton.
    // Creating user.
    await addUser(user, userStats);

    return res.status(200).json({ ...user, password: "" });
  } catch {
    res.status(500).json({ message: "An error has occured." });
  }
});

async function addUser(user, userStats) {
  maxId++;
  maxStatsId++;

  await user.encryptPassword(user.password);
  user.setId(maxId);
  user.setStatsId(maxStatsId);
  userStats.setId(maxStatsId);
  users.push(user);
  stats.push(userStats);
}

function calculateValidationErrors(user) {
  let arrayOfViolations = [];

  if (getUser(user.username) != undefined) {
    arrayOfViolations.push("User already exists.");
  }

  if (user.password.length < 5) {
    arrayOfViolations.push("Password too short, minimum 5 characters.");
  }

  return arrayOfViolations; // this function returns a list of violations of the requirements we previously set for username and password.
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
