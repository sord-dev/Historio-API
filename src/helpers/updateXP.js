let stats = require("../config/stats.json");

// Function takes in a statsID as parameter, and increases that IDs score by 5 plus a random bit (just to make it SEEEM more exciting)
function updateXP(username, statsID) {
  for (let stat of stats) {
    if (stat.statsID == statsID) {
      let increase = 20;
      // calculate prev level and new level
      let prev = Math.floor(stats.totalXP / 100)
      stat.totalXP += increase;
      let level = Math.floor(stats.totalXP / 100);

      // if they leveled up then return level up message else return stat increase
      if(prev < level) {
        return { message: `${username} LEVEL UP TO ${level}` };
      } else {

        return { message: `increase ${username || statsID} stats by ${increase}` };
      }

    }
  }
}

module.exports = updateXP;
