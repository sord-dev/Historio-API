const express = require('express');

const quizRouter = express.Router();

quizRouter.get('/leaderboard', (req, res) => {
    res.json([{name: 'bob'}, {name: 'dean'}])
})

module.exports = quizRouter;