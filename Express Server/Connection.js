
const mongoose = require('mongoose');


const connectToMongo = () => {
    mongoose.set("strictQuery", true);
    try {
        mongoose.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        );
    } catch (err) {
        console.log(process.env.DBURL)
        console.log(err);
    }
    mongoose.connection.on("error", (err) => {
        console.log("Error in Connection");
        console.log(err);
    })
    mongoose.connection.once("open", () => {
        console.log("SuccessFully Connected To the DB");
    })
}

module.exports = connectToMongo;