# Historio Questions API

**Auth**

- Sign in: POST /auth/login
- Sign up: POST /auth/sign-up
- Get account details: GET /auth/me
- Update Account: POST /auth/me

**Functional**

- Get highest ranked players: GET /quiz/leaderboard
- Get a list of questions and answers by type: GET /quiz/questions/:type
- Get a random question and answer by type: GET /quiz/questions/random/:type
