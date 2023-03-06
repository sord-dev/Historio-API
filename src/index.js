const express = require('express');
const cors = require('cors');
const quizRouter = require('./routes/quizRouter');
const userLogIn = require('./routes/auth.js');
const app = express();


const port = 3000;



app.use(cors());

app.use('/quiz', quizRouter);
app.use('/login', userLogIn)

app.listen(port, () => console.log(`listening on port - ${port}`))