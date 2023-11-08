const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "crud_mongodb";
const url = "mongodb://127.0.0.1:27017"; // Default location of MongoDB
const mongoOptions = {useNewUrlParser : true};

const state = {
    db : null
};

// Connect Method
    const connect = (cb) => {
    // Checking for connection
    if(state.db)
        cb();
    else {
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            // Checking for errors
            if(err)
                cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

const getDB = ()=>{
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};