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

// get and questions by type
quizRouter.get('/questions/:type', (req, res) => {
    // depending on type, return associated questions
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
            res.status(400).send()
    }
})

module.exports = quizRouter;
