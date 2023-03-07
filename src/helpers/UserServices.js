// This is an example of how we could extract some of the api functions on Thursday.

const users = require("../config/users.json");
const stats = require("../config/stats.json");

// function getUsers() {
//     return arrUsers;
// }

function getUser(username) {
  return users.find((user) => user.username == username);
}

function getUserDataByStatID(statsID) {
  const user = users.find(
    (user) => user.statsID === Number(statsID)
  );
  const stat = stats.find(
    (stat) => stat.statsID === Number(statsID)
  );

  return { user, stat };
}

// function addUser(user) {
//     arrUsers.push(user);
// }

// // generate maxId...

module.exports = { users, getUser, stats, getUserDataByStatID };
