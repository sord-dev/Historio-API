let stats = require('../config/stats.json')

// Function takes in a statsID as parameter, and increases that IDs score by 5 plus a random bit (just to make it SEEEM more exciting)
function updateXP(statsID) {
    console.log(stats);
    for (stat of stats) {
        if (stat.statsID === statsID) {
            stat.totalXP += (5 + Math.floor((Math.random() * 3)))
        }
    }
    return stats;
}

module.exports = updateXP;
