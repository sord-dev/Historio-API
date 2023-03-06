const express = require('express');
const randomChoice = require('../helpers/randomChoice');
const choiceQ = require('../config/questions/choice.json');
const imagesQ = require('../config/questions/images.json');
const wordsQ = require('../config/questions/words.json');


const quizRouter = express.Router();

// get and calculate leaderboard
quizRouter.get('/leaderboard', (req, res) => {
    res.json([{name: 'bob'}, {name: 'dean'}])
})

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
