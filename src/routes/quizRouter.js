const express = require('express');

const choiceQ = require('../config/questions/choice.json');
const imagesQ = require('../config/questions/images.json');
const wordsQ = require('../config/questions/words.json');

const users = require('../config/users.json');
const stats = require('../config/stats.json');

const randomChoice = require('../helpers/randomChoice');
const mapUsersToStats = require('../helpers/mapUsersToStats');
const calculate = require('../helpers/calcLeaderboard');

// /quiz/{endpoint}
const quizRouter = express.Router();

// get and calculate leaderboard
quizRouter.get("/leaderboard", (req, res) => {
    const formattedUsers = mapUsersToStats(users, stats);
    res.status(200).json(calculate(formattedUsers));
  });

// get all questions by type
quizRouter.get('/questions/:type', (req, res) => {
    // depending on type, return associated questions
    switch (req.params.type) {
        case "choice":
            res.json(choiceQ)
            break;
        case "images":
            res.json(imagesQ)
            break;
        case "words":
            res.json(wordsQ)
            break;
        default:
            res.status(404).send("Error 404: That question type doesn't exist bro.")
    }
})

// get a random question by type
quizRouter.get('/questions/random/:type', (req, res) => {
    // depending on type, return a random question
    switch (req.params.type) {
        case "choice":
            res.json(randomChoice(choiceQ))
            break;
        case "images":
            res.json(randomChoice(imagesQ))
            break;
        case "words":
            res.json(randomChoice(wordsQ))
            break;
        default:
            res.status(404).send("Error 404: That question type doesn't exist bro.")
    }
})

module.exports = quizRouter;
