const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/iNotebook";
const mongoURI = require("../config/keys").MONGO_URI;
const connetToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Mongo connection successfully!");
    });
}

module.exports = connetToMongo;