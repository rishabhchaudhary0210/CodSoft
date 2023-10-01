const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;

dotenv.config();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectToMongo = require('./Connection');

const app = express();


app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Started");
})

app.get("/home", (req, res) => {
    res.json({ 'Testing': 'Check response from cors api' });
})

app.use('/flight',require('./routes/Flight'));

app.use('/user', require('./routes/User'));

const start = async ()=>{
    try {
        await connectToMongo(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server started on Port : ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();

