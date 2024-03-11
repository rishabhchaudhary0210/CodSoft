const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const Razorpay = require("razorpay");


router.post("/orders", async (req, res) => {

    try{
        const razorpay = new Razorpay({
            key_id: process.env.RAZOR_APIKEY,
            key_secret: process.env.RAZOR_SECRET,
        });
        const options = {
            amount: req.body.amount*100,
            currency: "INR",
            receipt: "any unique id for every order",
            payment_capture: 1
        };

        razorpay.orders.create(options, (err, order) => {
            if(err){
                console.log(err);
                return res.status(500).json({error: "Razor Pay Order Error"})
            }
            return res.status(200).json({data : order});
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }

});

router.post("/verify", async (req,res) => {
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

        const sign = razorpay_order_id +"|"+razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZOR_SECRET).update(sign.toString()).digest("hex");
        console.log("rzpay === ", razorpay_signature);
        console.log("EXP SEIGN === ", expectedSign);
        if(razorpay_signature === expectedSign){
            return res.status(200).json({success : "Payment Successfull"});
        }
        else{
            return res.status(400).json({error: "Payment Signature Failed"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
})

module.exports = router;