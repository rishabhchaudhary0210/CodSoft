const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const fetch = require("node-fetch");


const dotenv = require('dotenv');
dotenv.config();

const getHotelHeader = ()=>{
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
    //required to create a sha256 (as per configuration of api)
    const dataToHash = process.env.hotelApiKey + process.env.hotelApiSecret + currentTimestamp;
    const hashedValue = crypto.createHash('sha256').update(dataToHash).digest('hex');
    return {
        "Api-key": process.env.hotelApiKey,
        "X-Signature": hashedValue,
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
}
// myHeaders.append("Api-key", "{{Api-key}}");
// myHeaders.append("X-Signature", "{{X-Signature}}");
// myHeaders.append("Accept", "application/json");
// myHeaders.append("Accept-Encoding", "gzip");
// myHeaders.append("Content-Type", "application/json");

router.get('/list', async (req, res) => {
    console.log("REquest HIT");
    const body = JSON.stringify({
        "stay": {
            "checkIn": "2024-06-15",
            "checkOut": "2024-06-16"
        },
        "occupancies": [
            {
                "rooms": 1,
                "adults": 1,
                "children": 0
            }
        ],
        "destination": {
            "code": "BOM"
        }
    })
    const header = getHotelHeader();
    try{
    const response = await fetch("https://api.test.hotelbeds.com/hotel-api/1.0/hotels",{
        method:"POST",
        headers:header,
        body:body,  
    });
    const data = await response.json();
    res.json(data);
    console.log(data);
    }
    catch(err){
        console.log(err);
        res.json({error:err});
    }
})

console.log("From Hotel js")
module.exports = router;