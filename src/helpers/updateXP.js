let stats = require("../config/stats.json");

// Function takes in a statsID as parameter, and increases that IDs score by 5 plus a random bit (just to make it SEEEM more exciting)
function updateXP(username, statsID) {
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

module.exports = updateXP;
