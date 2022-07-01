const mongo = require("../model/mongodb");

const helper = {
    findUserByEmail(email){
        return mongo.auth.findOne({email});
    }
}

module.exports = helper;