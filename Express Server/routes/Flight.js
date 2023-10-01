const express = require("express");
const router = express.Router();
const FlightDetail = require('./../models/FlightDetail');

const Amadeus = require('amadeus');

const amadeus = new Amadeus({
    clientId: process.env.apiKey,
    clientSecret: process.env.apiSecret
});

router.get(`/airport-search/:parameter`, async (req, res) => {
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

router.get("/flight-search", async (req, res) => {

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



router.post("/booking-request", async (req, res) => {

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



router.post('/booking-confirm', async (req, res) => {
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


        // let uniqueid = uuidv4();
        const flightBookingData = await FlightDetail.create({
            obj: JSON.stringify(responseData)
        })
        console.log(flightBookingData._id);
    
        res.json({ key: flightBookingData._id })

    } catch (err) {
        console.log(err);
        res.status(400).json({ "Error": "Error getting Data" });
    }
})

router.get('/booking-display/:id', async (req, res) => {
    try {
        const details = await FlightDetail.findOne({ _id: req.params.id });
        res.json(details);
    }
    catch (err) {
        console.log(err)
    }
    // console.log(details)
})

module.exports = router;