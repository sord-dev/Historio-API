// takes in users json and maps the stats json by id
function mapUsersToStats(users, stats) {
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

module.exports = mapUsersToStats;
