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

function updateUserStatsID(username, newStatsID) {
    let targetUser = getUser(username);
    const targetUserIndex = users.indexOf(targetUser);
    users[targetUserIndex].statsID = newStatsID;
}

// If we use PUT request to update user...
// function updateUser(user) {
//     const targetUserIndex = users.indexOf(x => x.username == user.username);
//     if (targetUserIndex > -1)
//         users[targetUserIndex] = user;
// }

// // generate maxId...

module.exports = { users, getUser, stats, getUserDataByStatID };
