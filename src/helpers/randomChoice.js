function randomChoice(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}


module.exports = randomChoice
