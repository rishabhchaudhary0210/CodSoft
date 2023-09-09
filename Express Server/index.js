const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Amadeus = require('amadeus');
const dotenv = require('dotenv');

const port = process.env.PORT || 8080;

dotenv.config();

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
        queryObj[returnDate] = returnExp;
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
    console.log(req.body);
    const responsePricing = await amadeus.shopping.flightOffers.pricing
        .post(
            JSON.stringify({
                data: {
                    type: "flight-offers-pricing",
                    flightOffers: [inputFlight],
                },
            })
        )
        .catch((err) => console.log(err));
    try {
        const responseData = await responsePricing.body;
        res.json(JSON.parse(responseData));
    } catch (err) {
        res.json(err);
    }
    // res.json(inputFlight);
})

app.listen(port, () => {
    console.log(`Server started on Port : ${port}`);
})