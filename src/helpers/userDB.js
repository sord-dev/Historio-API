const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message)
        throw err
    }
    else {
        console.log("Connected to SQLite database.")
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username text,
            password text
        )`,
        (err) => {
            if (err) {
                console.log("Table already exists.")
            }
            else {
                console.log("Table created")
                const insert = "INSERT INTO users (id, username, password) VALUES (?, ?, ?)"
                db.run(insert, 
                    [0001, "test", "t3st"])
            }
        })
    }
})

module.exports = db