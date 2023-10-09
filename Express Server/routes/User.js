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
            res.status(400).json({ 'error': 'This email is already registered' });
            return;
        }
        
        const hashedPass = await bcrypt.hash(password, 12);
        user = await UserDetail.create({
            name:name,
            email: email,
            password: hashedPass,
            phone: phone,
            bookingID: [],
        })
        const payload = { email: user.email, _id: user._id }
        const token = jwt.sign(payload, '&Vi%33pG2mD51xMo%OUOTo$ZWOa3TYt328tcjXtW9&hn%AOb9quwaZaRMf#f&44c', { expiresIn:7*24*60*60 });

        console.log(user);
        console.log(token);
        res.cookie('jwt',token, {httpOnly:true});
        res.json({'success':'Signed Up Successfully'});
        //figure out jwt credentials
    }
    catch (err) {
        console.log(err);
        res.status(500).json({'error':"Internal Server Error"});
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
        const payload = {email:user.email, _id:user._id};
        const token = jwt.sign(payload, '&Vi%33pG2mD51xMo%OUOTo$ZWOa3TYt328tcjXtW9&hn%AOb9quwaZaRMf#f&44c', { expiresIn:7*24*60*60 });
        res.cookie('jwt',token,{httpOnly:true});
        res.json({'success':'Logged In Successfully'});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({'error':"Internal Server Error"});
    }
})

// router.post('forgot-password', (req, res)=>{

// })

//router.get('get-user', (req, res)=>{})


router.get('/booking-display', async (req, res) => {

    try {
        const details = await FlightDetail.find({ _id: { $in: arrOfuids } });
        console.log(details);
        res.json({ bookingDetails: details });
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;