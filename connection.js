const mongoose = require("mongoose");

async function MongoConnect(URL){
    return await mongoose.connect(URL)
};

module.exports = {
    MongoConnect
}

