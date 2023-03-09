const express = require("express");
const bcrypt = require("bcrypt");

const {
  getUser,
  getUserDataByStatID,
  addUser,
  updateUserXP
} = require("../helpers/UserServices.js");

const User = require("../models/User.js");
const Stat = require("../models/Stat.js");

// /quiz/{endpoint}
const userLogIn = express.Router();

//get user data IF logged in
userLogIn.get("/me", (req, res) => {
  const { headers } = req;

  const { stat, user } = getUserDataByStatID(headers.authorization);

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
    const response = updateUserXP(user.username, user.statsID);
    res.status(200).json(response);
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

module.exports = userLogIn;
