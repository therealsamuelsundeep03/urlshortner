const mongo = require("../model/mongodb");

const helper = {
    findUserByEmail(email){
        return mongo.auth.findOne({email});
    },

    addUser(username,email,password){
        return mongo.auth.insertOne({username,email,password});
    }
}

module.exports = helper;