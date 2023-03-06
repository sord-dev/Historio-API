const express = require('express');
const cors = require('cors');
const quizRouter = require('./routes/quizRouter');
const app = express();

const port = 3000;

app.use(cors());
app.use(express.json())

app.use('/quiz', quizRouter);

app.listen(port, () => console.log(`listening on port - ${port}`))