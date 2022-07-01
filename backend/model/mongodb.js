const mongodb = require('mongodb');

const mongo={
    db:null,
    auth:null,
    urlshort:null,

    async connect(){
        const client = new mongodb.MongoClient("mongodb+srv://samuel:plmqazsam123@guvi-experiment.etqqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        await client.connect()
            .then(()=>{
                console.log("Database connected");
            })
            .catch(err=>{
                console.log("Error in connecting to the database::",err);
            })

        this.db = client.db('urlshort');
        console.log("collection selected");
        
        this.auth=mongo.db.collection('auth')

        this.urlshort=mongo.db.collection('urlshort');

    }
}

module.exports = mongo;