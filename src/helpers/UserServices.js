// This is an example of how we could extract some of the api functions on Thursday.

const users = require("../config/users.json");

// function getUsers() {
//     return arrUsers;
// }

function getUser(username) {
    return users.find(user => user.username == username);
}

// function addUser(user) {
//     arrUsers.push(user);
// }

// // generate maxId...

module.exports = { users, getUser }