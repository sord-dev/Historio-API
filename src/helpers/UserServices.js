// MAIN VARIABLES
const users = require("../config/users.json");
const stats = require("../config/stats.json");

let maxId = users.length; // getting users length to create unique Id.
let maxStatsId = stats.length; // getting users length to create unique Id.

// GET USERS
function getUser(username) {
  return users.find((user) => user.username == username);
}

function getUserDataByStatID(statsID) {
  const user = users.find((user) => user.statsID === Number(statsID));
  const stat = stats.find((stat) => stat.statsID === Number(statsID));

  return { user, stat };
}

// takes in users json and maps the stats json by id
function mapUsersToStats() {
  if (users.length !== stats.length) {
    return { error: "data error - users and stats object lengths missmatch" };
  }

  let formattedUsers = [];

  // loop over the users
  for (i = 0; i < users.length; i++) {
    // match their stats by id in an object and append them to formattedUsers array
    formattedUsers.push({
      username: users[i].username,
      stats: stats.find((stat) => stat.statsID === users[i].statsID),
    });
  }

  // return the users mapped to stats
  return formattedUsers;
}

// Function updated to use totalXP
// gets all the users by stats, sorts them and returns top 5
// -- EXPECTS FORMATTED USERS FROM mapUsersToStats!!
function calculateLeaderboard(formattedUsers, length = 5) {
  if(formattedUsers.length <= 0 || !formattedUsers[0].stats) return {error: 'invalid data type'}
  return formattedUsers.sort((a, z) => z.stats.totalXP - a.stats.totalXP).slice(0, length);
}

// ADD USERS
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

// EDIT USERS

// Function takes in a statsID as parameter, and increases that IDs score by 5 plus a random bit (just to make it SEEEM more exciting)
function updateUserXP(username, statsID) {
  for (let stat of stats) {
    if (stat.statsID == statsID) {
      let increase = 20;

      stat.totalXP += increase;

      return {
        message: `increase ${username || statsID} stats by ${increase}`,
      };
    }
  }
}


module.exports = {
  users,
  getUser,
  stats,
  getUserDataByStatID,
  addUser,
  mapUsersToStats,
  calculateLeaderboard,
  updateUserXP
};
