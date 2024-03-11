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
    try {
    const response = await amadeus.referenceData.locations
        .get({
            keyword: parameter,
            subType: Amadeus.location.airport,
        }).catch(x => console.log(x));
        const apiData = await response.body;
        res.json(JSON.parse(apiData));
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ "Error": "Error getting Data" ,err});
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
        res.status(400).json({ "Error": "Error getting Data" , err});
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
        res.status(400).json({ "Error": "Error getting Data" , err});
    }
    // res.json(inputFlight);
})



router.post('/booking-confirm', async (req, res) => {
    const { flightInfo, travelerInfo, restoken } = req.body;
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
        
        const token =  restoken || req.cookies.jwt;
        console.log('res = ',restoken);

        const checkLogin = await verifyLogin(token);
        console.log("checkLogin = ", checkLogin);
        
        if(checkLogin!==null && checkLogin !== false){
            const temp = await UserDetail.findOneAndUpdate({_id:checkLogin._id},{$push:{bookingID:flightBookingData._id}});
            console.log('obj',temp);
        }

        res.status(200).json({ key: flightBookingData._id })

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ "Error": "Error getting Data" , err});
    }
})

router.get('/manage-booking/:orderId', async (req,res)=>{
    try{
        const { orderId } = req.params;
        const order = await amadeus.booking.flightOrder(encodeURIComponent(orderId)).get()
        const details = await order.body;
        // console.log(details);
        res.status(200).json(details);
    }
    catch(err){
        res.status(400).json({error:'Error getting data', err});
    }
})

router.get('/delete-booking/:orderId', async (req,res)=>{
    try{
        const { orderId  } = req.params;
        const { userID, flightID } = req.query;
        const order = await amadeus.booking.flightOrder(decodeURIComponent(orderId)).delete();
        const del = await order?.body;
        // console.log("Del = ",del);
        if(userID && flightID ){
            const user = await UserDetail.findOneAndUpdate({_id:userID}, {$pull:{bookingID:flightID}})
        }

        res.status(200).json({success:"Booking deleted successfully"});
    }
    catch(err){
        res.status(400).json({error:'Error deleting data', err});
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