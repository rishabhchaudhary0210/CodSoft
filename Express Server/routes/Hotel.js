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
    console.log(hashedValue);
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
            // "code": req.params.city
            "code": "NYC",
        }
        // "hotels": {
        //     "hotel": [
        //         1,
        //         373757,
        //         2,3,4
        //     ]
        // }
    })
    try{
        const response = await fetch("https://api.test.hotelbeds.com/hotel-api/1.0/hotels",{
            method:"POST",
            headers:getHotelHeader(),
            body:body,  
        });
        const data = await response.json();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err});
    }
})

router.get("/content", async (req,res)=>{
    try{
        //more query params destinationCode countryCode
        const response = await fetch("https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&language=ENG&from=1&to=10&useSecondaryLanguage=false", {
            headers:getHotelHeader(),
        })
        const data = await response.json();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err});
    }
})
//for one particular hotel
router.get("/content/:hotelCode", async (req, res)=>{
    try{
        const response = await fetch(`https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels/${req.params.hotelCode}/details?language=ENG&useSecondaryLanguage=False`, {
            headers:getHotelHeader(),
        })
        const data = await response.json();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err});
    }
})
router.get("/countries", async (req,res)=>{
    try{
        //more query params         codes(for specifying country)
        const response = await fetch("https://api.test.hotelbeds.com/hotel-content-api/1.0/locations/countries?fields=all&language=ENG&from=1&to=1000", {
            headers:getHotelHeader(),
        })
        const data = await response.json();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err});
    }
})
router.get("/destinations", async (req,res)=>{
    //countryCodes<-specific country or list EU,US          codes (specific destination)
    try{
        const response = await fetch("https://api.test.hotelbeds.com/hotel-content-api/1.0/locations/destinations?fields=all&language=ENG&from=1&to=1000&useSecondaryLanguage=false&countryCodes=IN", {
            headers : getHotelHeader(),
        })
        const data = await response.json();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err});
    }
})
router.get("/booking", async (req, res)=>{
    const body = JSON.stringify({
        "holder": {
          "name": "HolderFirstName",
          "surname": "HolderLastName"
        },
        "rooms": [
          {
            "rateKey": "20240615|20240616|W|254|124294|DBL.KG-1|FIT FEE EXCL|RO||1~1~0||N@06~~208fc~610579379~N~~~NOR~5E61595510E640D170679833178100AAUK00000810000000001208fc",
            "paxes": [
            //   {
            //     "roomId": 1,
            //     "type": "AD",
            //     "name": "First Adult Name",
            //     "surname": "Surname"
            //   },
              {
                "roomId": 1,
                "type": "AD",
                "name": "Second Adult Name",
                "surname": "Surname"
              }
            ]
          },
        //   {
        //     "rateKey": "20240615|20240616|W|254|124294|DBL.KG-1|FIT FEE EXCL|RO||1~1~0||N@06~~208fc~610579379~N~~~NOR~5E61595510E640D170679833178100AAUK00000810000000001208fc",
        //     "paxes": [
        //       {
        //         "roomId": 1,
        //         "type": "AD",
        //         "name": "Third Adult Name",
        //         "surname": "Surname"
        //       },
        //       {
        //         "roomId": 1,
        //         "type": "CH",
        //         "name": "First Child Name",
        //         "surname": "Surname"
        //       }
        //     ]
        //   }
        ],
        "clientReference": "IntegrationAgency",
        "remark": "Booking remarks are to be written here.",
        "tolerance": 2,
        // "paymentData": {
        //     "paymentCard": {
        //         "cardHolderName": "CardHolderName",
        //         "cardType": "VI",
        //         "cardNumber": "4444333322221111",
        //         "expiryDate": "0320",
        //         "cardCVC": "123"
        //     },
        //     "contactData": {
        //         "email": "integration@hotelbeds.com",
        //         "phoneNumber": "654654654"
        //     },
        //     "billingAddress": {
        //         "address1": "Cambridge Science Park",
        //         "address2": "Milton Road",
        //         "city": "Cambridge",
        //         "state": "Cambridgeshire",
        //         "postalCode": "CB4 0FZ",
        //         "countryCode": "GB"
        //     },
        //     "webPartner": "1",
        //     "device": {
        //         "id": "abcd",
        //         "ip": "123.12.12.12.21"
        //     }
        // }
      });
      
    try{
        const response = await fetch("https://api.test.hotelbeds.com/hotel-api/1.2/bookings",{
            method: 'POST',
            headers: getHotelHeader(),
            body: body,
          })
          const data = await response.json();
          res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err});
    }
})
router.get("/booking/:bookingRef", async (req,res)=>{
    try{
        const response = await fetch(`https://api.test.hotelbeds.com/hotel-api/1.2/bookings/${req.params.bookingRef}`, {
            headers:getHotelHeader(),
        })
        const data = await response.json();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(200).json({error:err});
    }
})
module.exports = router;