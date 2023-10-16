const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer');//to send mails for forgot password
const validator = require('validator'); // to check for errors

const UserDetail = require('./../models/UserDetail');
const FlightDetail = require('./../models/FlightDetail');



router.post('/sign-up', async (req, res) => {
    const { name, email, phone, password } = req.body;
    console.log("Req");
    try {
        let user = await UserDetail.findOne({ email });
        if(user){
            return res.status(400).json({ error: 'This email is already registered' });
        }
        const hashedPass = await bcrypt.hash(password, 12);
        user = await UserDetail.create({
            name:name,
            email: email,
            password: hashedPass,
            phone: phone,
            bookingID: [],
        })
        const payload = { _id: user._id, name:user.name }
        const token = jwt.sign(payload, '&Vi%33pG2mD51xMo%OUOTo$ZWOa3TYt328tcjXtW9&hn%AOb9quwaZaRMf#f&44c', { expiresIn:7*24*60*60 });

        console.log(user);
        console.log(token);
        res.cookie('jwt',token, {maxAge:24*60*60*1000,httpOnly:true}).status(200).json({success:'Signed Up Successfully', user:payload});
        //figure out jwt credentials
    }
    catch (err) {
        console.log(err);
        res.status(400).json({error:"Internal Server Error"});
    }
})

router.post('/log-in', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserDetail.findOne({ email });
        if (!user) {
            return res.status(400).json({ 'error': 'Invalid Credentials' });
        }
        let passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ 'error': 'Invalid Credentials' });
        }

        //figure out jwt here
        const payload = {_id:user._id, name:user.name};
        const token = jwt.sign(payload, '&Vi%33pG2mD51xMo%OUOTo$ZWOa3TYt328tcjXtW9&hn%AOb9quwaZaRMf#f&44c', { expiresIn:7*24*60*60 });
        res.cookie('jwt',token,{maxAge:24*60*60*1000,httpOnly:true}).status(200).json({success:'Logged In Successfully', user:payload});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({'error':"Internal Server Error"});
    }
})

router.get('/log-out',(req, res)=>{
    res.clearCookie('jwt');
    res.end();
})

// router.post('/forgot-password', (req, res)=>{

// })

router.get('/check-user', (req, res)=>{
    const token = req.cookies.jwt;
    const checkToken = jwt.verify(token, '&Vi%33pG2mD51xMo%OUOTo$ZWOa3TYt328tcjXtW9&hn%AOb9quwaZaRMf#f&44c', async (err, decoded)=>{
        if(err){
            return res.status(400).json({error:'User cannot be verified'});
        }
        return res.status(200).json({success:'User Logged In Successfully', user:decoded});
    });
})

//change name and make it to get details of users bookings
router.get('/booking-details/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UserDetail.findOne({_id:userId});
        if(!user){
            return res.status(400).json({error:'Error finding user details.'});
        }
        
        const details = await FlightDetail.find({ _id: { $in: bookingID } });
        if(details.length === 0) {
            return res.status(400).json({error:'Oops! No results found.'});
        }
        res.json({ bookingDetails: details });
    }
    catch (err) {
        res.status(400).json({error:'Error finding Details'})
    }
})

module.exports = router;