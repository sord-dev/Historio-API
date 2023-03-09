const express = require("express");
const cors = require("cors");
const quizRouter = require("./routes/quizRouter");
const userLogIn = require("./routes/auth.js");
const app = express();

const { choiceQ, imagesQ, wordsQ } = require("./helpers/QuizServices.js");
const { users } = require("./helpers/UserServices.js");

const logRequests = require("./helpers/logRequests");

const port = 3000;

app.use(express.json());
app.use(cors());
app.use(logRequests);

// adding localhost:3000 endpoint to show ammount of questions and users

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Historio API, heres some stats:",
    users: users.length,
    choiceQuestions: choiceQ.length,
    imagesQuestions: imagesQ.length,
    wordsQuestions: wordsQ.length,
  });
});

app.use("/quiz", quizRouter);
app.use("/auth", userLogIn);

app.listen(port, () => console.log(`listening on port - ${port}`));
