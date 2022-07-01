const mongo = require("../model/mongodb");

const helper={
    findOneUrl(fullurl){
        return  mongo.urlshort.findOne({fullurl});
    },
    findUrl(){
        return  mongo.urlshort.find().toArray();
    },
    createUrl(url){
        return  mongo.urlshort.insertOne(url);
    },
    deleteById(_id){
        return  mongo.urlshort.deleteOne({_id});
    }
}

module.exports = helper;