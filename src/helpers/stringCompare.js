const data = require("../config/questions/images.json")

function stringCompare(question, guess) {
    let answer = data.find(item => item.questionID === question)
    let artist = answer.artist.toLowerCase()
    let title = answer.title.toLowerCase()
    guess = guess.toLowerCase()

    if (artist.includes(guess) && ((artist.length / guess.length) < 2)) {
        return true;
    } else if (title.includes(guess) && ((title.length / guess.length) < 2)) {
        return true;
    } else {
        return false;
    }
}

console.log(stringCompare(2, "starry"));
// vincent van gogh

module.exports = stringCompare;
