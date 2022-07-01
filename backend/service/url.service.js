const { ObjectId } = require('mongodb');
const shortId = require('shortid');

const helper = require("../helper/url.helper");

const service={
    async getUrl(req,res){
        try{
            let response= await helper.findUrl();
            console.log("Data fetched::",response);
            res.status(200).json({
                "status":"success",
                "data":response
            })  
        }catch(err){
            console.log("Error in fetching the data::",err);
            res.status(500).json({"status":"Fail",err});
        }
    }, 
    async postUrl(req,res){
        try{
            const {fullUrl,shortUrl} = req.body;
            if(fullUrl){
                const response = await helper.findOneUrl(fullUrl);
                if(response){
                    res.status(200).json({status:"success",data:response,exists:"yes"});
                    console.log(response)
                }else{
                    const short = shortId.generate();
                    let {insertedId}= await helper.createUrl({fullurl:req.body.fullUrl,shorturl:short});
                    console.log("Data inserted:",[{_id:insertedId,full:req.body.fullurl}]);
                    res.status(200).json({
                        "status":"success",
                        "data":{_id:insertedId,fullurl:req.body.fullUrl,shorturl:short}
                    });
                    // console.log(data)
                }
            }else{
                res.send("Please Enter A Valid URL")
            }
        }
        catch(err){
            // console.log(req.body.url)
            console.log("Error in inserting the data::",err);
            res.status(500).json({"status":"Fail",err});
        }
    },

    async deleteUrl (req,res) {
        if(req.params.id){
            try{
                const _id = ObjectId(req.params.id);
                const response = await helper.deleteById(_id);
                console.log(response)
            }catch(err){
                console.log(err)
            }
        }
    }
}

module.exports = service;

