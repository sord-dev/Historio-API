// This is an example of how we could extract some of the api functions on Thursday.

const users = require("../config/users.json");
const stats = require("../config/stats.json");

let maxId = users.length; // getting users length to create unique Id.
let maxStatsId = stats.length; // getting users length to create unique Id.

function getUser(username) {
  return users.find((user) => user.username == username);
}

function getUserDataByStatID(statsID) {
  const user = users.find((user) => user.statsID === Number(statsID));
  const stat = stats.find((stat) => stat.statsID === Number(statsID));

  return { user, stat };
}

async function addUser(user, userStats) {
  maxId++;
  maxStatsId++;

  await user.encryptPassword(user.password);
  user.setId(maxId);
  user.setStatsId(maxStatsId);
  userStats.setId(maxStatsId);
  users.push(user);
  stats.push(userStats);
}

module.exports = { users, getUser, stats, getUserDataByStatID, addUser };
