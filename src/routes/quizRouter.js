const express = require('express');

const quizRouter = express.Router();

// get and calculate leaderboard
quizRouter.get('/leaderboard', (req, res) => {
    res.json([{name: 'bob'}, {name: 'dean'}])
})

// get and questions by type
quizRouter.get('/questions/:type', (req, res) => {
    // depending on type, return associated questions
    res.json([{question1: 'bob'}, {question2: 'dean'}])
})

module.exports = quizRouter;