let stats = require('../config/stats.json')

// Function takes in a statsID as parameter, and increases that IDs score by 5 plus a random bit (just to make it SEEEM more exciting)
function updateXP(statsID) {
    for (stat of stats) {
        if (stat.statsID === statsID) {
            stat.totalXP += (10 + Math.floor((Math.random() * 5)))
            return stat;
        }
    }
}

module.exports = updateXP;
