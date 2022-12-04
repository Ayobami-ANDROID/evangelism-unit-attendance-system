const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/user')

router.post('/createUser', async(req,res)=>{

    const {firstname,lastname,regNo,matricNo,level,hall,roomNO}= req.body
    if(!firstname || !lastname || !regNo || !matricNo || !level ||!hall || ! roomNO){
        res.status(400).send('all fields are required')
    }
    const user = await User.create(req.body)
    res.status(200).json({user})
})
module.exports = router