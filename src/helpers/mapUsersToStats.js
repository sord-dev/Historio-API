// takes in users json and maps the stats json by id
function mapUsersToStats(users, stats) {
  if (users.length !== stats.length) {
    console.log("data error - users and stats object lengths missmatch");
    return;
  }

  let formattedUsers = [];

  // loop over the users and match their stats by id;
  for (i = 0; i < users.length; i++) {
    formattedUsers.push({
      username: users[i].username,
      stats: stats.find((stat) => stat.statsID === users[i].statsID),
    });
  }

  return formattedUsers;
}

module.exports = mapUsersToStats;
