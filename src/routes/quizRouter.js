const express = require("express");
const { choiceQ, imagesQ, wordsQ } = require("../helpers/QuizServices");
const {
  mapUsersToStats,
  calculateLeaderboard,
} = require("../helpers/UserServices.js");

const randomChoice = require("../helpers/randomChoice");

// /quiz/{endpoint}
const quizRouter = express.Router();

// get and calculate leaderboard
quizRouter.get("/leaderboard", (req, res) => {
  const formattedUsers = mapUsersToStats();
  res.status(200).json(calculateLeaderboard(formattedUsers));
});

// get all questions by type
quizRouter.get("/questions/:type", (req, res) => {
  // depending on type, return associated questions
  switch (req.params.type) {
    case "choice":
      res.json(choiceQ);
      break;
    case "images":
      res.json(imagesQ);
      break;
    case "words":
      res.json(wordsQ);
      break;
    default:
      res.status(404).send("Error 404: That question type doesn't exist bro.");
  }
});

// get a random question by type
quizRouter.get("/questions/random/:type", (req, res) => {
  // depending on type, return a random question
  switch (req.params.type) {
    case "choice":
      res.json(randomChoice(choiceQ));
      break;
    case "images":
      res.json(randomChoice(imagesQ));
      break;
    case "words":
      res.json(randomChoice(wordsQ));
      break;
    default:
      res.status(404).send("Error 404: That question type doesn't exist bro.");
  }
});

module.exports = quizRouter;
