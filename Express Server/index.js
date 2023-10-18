const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;


const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectToMongo = require('./Connection');

const app = express();

app.use(morgan('tiny'));
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://travelpartner.vercel.app'],
    credentials:  true,
}));
    // app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     next();
    //   });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    // const a = req.cookies();
    console.log(req.cookies);
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

