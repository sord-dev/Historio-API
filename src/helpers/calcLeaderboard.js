// gets all the users by stats, sorts them and returns top 3
function calculate(formattedUsers, length = 3) {
    return formattedUsers.sort((a, z) => z.stats.level - a.stats.level).slice(0, length);
}

module.exports = calculate;
