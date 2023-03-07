const bcrypt = require("bcrypt");


// Creating a class to model user. This class has a method to encrypt the user password. 
class User {

    constructor (username, password, statsId) {
       this.id = undefined;
       this.username = username;
       this.password = password;
       this.statsId = statsId;
    }
   
    async encryptPassword() {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt);
    }

    async checkEncryptedPassword(strPassword) {
        try {
        const result = await bcrypt.compare(strPassword, this.password)
        return result
        } 
        catch (error) {
            return "Wrong password."
        }
    }

    setId (id) {
        this.id = id;
    }
}


module.exports = User;