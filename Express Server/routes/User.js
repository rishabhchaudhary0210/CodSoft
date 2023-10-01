const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer');//to send mails for forgot password
const validator = require('validator'); // to check for errors

const UserDetail = require('./../models/UserDetail');
const FlightDetail = require('./../models/FlightDetail');


router.post('sign-up', async (req, res) => {
    const { email, phone, password } = req.body;
    try {
        let user = await UserDetail.findOne({ email });
        res.status(400).json({ 'error': 'This email is already registered' });
        const hashedPass = await bcrypt.hash(password, 12);

        user = await UserDetail.create({
            email: email,
            password: hashedPass,
            phone: phone,
            bookingID: [],
        })

        //figure out jwt credentials
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

router.post('log-in', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserDetail.findOne({ email });
        if (!user) {
            req.status(400).json({ 'error': 'Invalid Credentials' });
        }
        let passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            req.status(400).json({ 'error': 'Invalid Credentials' });
        }

        //figure out jwt here

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
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