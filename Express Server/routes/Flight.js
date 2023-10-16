const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const FlightDetail = require('./../models/FlightDetail');
const UserDetail = require('./../models/UserDetail');

const Amadeus = require('amadeus');
const amadeus = new Amadeus({
    clientId: process.env.apiKey,
    clientSecret: process.env.apiSecret
});

function verifyLogin(token){
    return jwt.verify(token, process.env.JWT_SECRET,async (err, decode)=>{
        if(!err){
            return await decode;
        }
        console.log(err);
        return false;
    })
}

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
    try {
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
    // console.log(returnBooking)
        const responseData = await returnBooking.result;

        //saving to mongodb
        const flightBookingData = await FlightDetail.create({
            obj: JSON.stringify(responseData)
        })
        console.log(flightBookingData._id);
        
        const token = req.cookies.jwt;
        const checkLogin = await verifyLogin(token);
        console.log(checkLogin);
        if(checkLogin!==null && checkLogin !== false){
            // const user = await UserDetail.findOne({_id:checkLogin._id});
            // const { bookingID } = user;
            // bookingID.push(flightBookingData._id);
            const temp = await UserDetail.findOneAndUpdate({_id:checkLogin._id},{$push:{bookingID:flightBookingData._id}});
            console.log(temp);
        }

        res.json({ key: flightBookingData._id })

    } catch (err) {
        console.log(err.message);
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