const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");

const DBSOURCE = "src/config/db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message)
        throw err
    }
    else {
        console.log("Connected to SQLite database.")
        db.run(`CREATE TABLE users (
            id INTEGER NOT NULL UNIQUE,
            username text NOT NULL UNIQUE,
            password text,
            statsId INTEGER,
            PRIMARY KEY(id, username)
        )`,
        (err) => {
            if (err) {
                console.log("Table already exists.")
            }
            else {
                console.log("Table created")
                const insert = "INSERT INTO users (id, username, password, statsId) VALUES (?, ?, ?, ?)"
                db.run(insert, 
                    [1234567, "admin", "adm1n", 0])
            }
        })
    }
})

module.exports = db