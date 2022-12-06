const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/i-notebook";

function connectToMongo(){
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to DB");
    })
}


module.exports = {connectToMongo};
