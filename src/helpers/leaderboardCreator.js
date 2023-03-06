// const stats = require('../config/stats.json')

// function sorts first by stats.level, then if the level are equal, it sorts by the progress within the level.
// Returns complete list sorted from high to low
function leaderboardCreator(stats) {
    stats.sort((b, a) => {
        if (a.level === b.level) {
            return a.progress - b.progress;
        }
        return a.level - b.level;
    });
    return stats;
};

// console.log(leaderboardCreator(stats))

module.exports = leaderboardCreator;
