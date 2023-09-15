const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Amadeus = require('amadeus');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');

const port = process.env.PORT || 8080;

dotenv.config();

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
    console.log("SuccessFully Connected TO the DB");
})

const userSchema = {
    email:String,
    phone:String,
    password:String,
    objId:[String],
}
const flightBookingSchema = {
    _id : String,
    obj : String,
}

const User = mongoose.model('User',userSchema);
const FlightDetail = mongoose.model('FlightDetail',flightBookingSchema);


const amadeus = new Amadeus({
    clientId: process.env.apiKey,
    clientSecret: process.env.apiSecret
});

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

app.get(`/airport-search/:parameter`, async (req, res) => {
    const parameter = req.params.parameter;
    const response = await amadeus.referenceData.locations
        .get({
            keyword: parameter,
            subType: Amadeus.location.airport,
        }).catch(x => console.log(x));
    try {
        const apiData = await response.body;
        res.json(JSON.parse(apiData));
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ "Error": "Error getting Data" });
    }
    // console.log(apiData);
});

app.get("/flight", async (req, res) => {

    const { originCode, destinationCode, departDate, adultCount, childCount, infantCount } = req.query;
    const returnExp = req.query?.returnDate;
    console.log(req.query);
    let queryObj = {
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: departDate,
        adults: adultCount,
        children: childCount,
        infants: infantCount,
        currencyCode: "INR",
    };
    if (returnExp != null) {
        queryObj.returnDate = returnExp;
    }
    const response = await amadeus.shopping.flightOffersSearch
        .get(queryObj)
        .catch(x => console.log(x));
    try {
        const apiData = await response.body;
        // console.log(JSON.parse(apiData));
        res.json(JSON.parse(apiData));
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ "Error": "Error getting Data" });
    }
    // console.log(apiData);
})



app.post("/flight-booking", async (req, res) => {

    const inputFlight = await req.body;
    // console.log(inputFlight);
    // inputFlight[0].price.total='1231';
    // inputFlight[0].price.grandTotal='1231';
    // inputFlight[0].price.base='1231';
    const responsePricing = await amadeus.shopping.flightOffers.pricing
        .post(
            JSON.stringify({
                data: {
                    type: "flight-offers-pricing",
                    flightOffers: inputFlight,
                },
            })
        )
        .catch((err) => console.log(err));
    try {
        const responseData = await responsePricing.body;
        res.json(JSON.parse(responseData));
    } catch (err) {
        console.log(err);
        res.status(400).json({ "Error": "Error getting Data" });
    }
    // res.json(inputFlight);
})



let flightBookingConfirm;
app.post('/flight-confirm', async (req, res) => {
    const { flightInfo, travelerInfo } = req.body;
    // console.log(travelerInfo);
    const returnBooking = await amadeus.booking.flightOrders
        .post(
            JSON.stringify({
                data: {
                    type: "flight-order",
                    flightOffers: flightInfo,
                    travelers: travelerInfo
                },
            })
        )
        .catch(x => res.json(x))
    try {
        // console.log(returnBooking)
        const responseData = await returnBooking.result;

        //saving to mongodb
        
        try{
            let uniqueid = uuidv4();
            const flightBookingData = new FlightDetail({
                _id : uniqueid,
                obj : JSON.stringify(responseData)
            })
            await flightBookingData.save();
            console.log("Saved Successfully");
            console.log("Reponse should be recieved");
            console.log(uniqueid);
            flightBookingConfirm = responseData;
            res.json({key:uniqueid})
        }catch(e){
            console.log(e);
        }


    }catch(err){
        console.log(err);
        res.status(400).json({ "Error": "Error getting Data" });
    }   
    // res.json({ "trav": travelerInfo, "flight": flightInfo });
})

app.get('/flight-booking-done/:id', (req, res)=>{
    const {id} = req.params;
    FlightDetail.findOne({_id:req.params.id},(err,result)=>{
        if(!err){
            if(result){
                console.log("Found");
                console.log(result);
            }
        }
    })
    res.json(flightBookingConfirm);
})


app.listen(port, () => {
    console.log(`Server started on Port : ${port}`);
})