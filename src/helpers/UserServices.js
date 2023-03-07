// This is an example of how we could extract some of the api functions on Thursday.

const users = require("../config/users.json");

// function getUsers() {
//     return arrUsers;
// }

function getUser(username) {
    return users.find(user => user.username == username);
}

function updateUserStatsID(username, newStatsID) {
    let targetUser = getUser(username);
    const targetUserIndex = users.indexOf(targetUser);
    users[targetUserIndex].statsID = newStatsID;
}

// If we use PUT request to update user...
// function updateUser(user) {
//     const targetUserIndex = users.indexOf(x => x.username == user.username);
//     if (targetUserIndex > -1)
//         users[targetUserIndex] = user;
// }

// // generate maxId...

module.exports = { users, getUser }