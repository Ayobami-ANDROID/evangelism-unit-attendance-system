const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/user')


router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(201).send(users)
    } catch (error) {
      console.log("Cannot find users");
    }
  });

router.post('/createUser', async(req,res)=>{

    const {firstname,lastname,regNo,matricNo,level,hall,roomNO}= req.body
    if(!firstname || !lastname || !regNo || !matricNo || !level ||!hall || ! roomNO){
        res.status(400).send('all fields are required')
    }
    const user = await User.create(req.body)
    res.status(200).json({user})
})

router.post("/:id/enter", async (req, res) => {
    try {
      const data = {
        entry: Date.now()
      };
      const user = await User.findById(req.params.id);
  
      //if the user has an attendance array;
     
      if(user.attendance && user.attendance.length > 0){
      //for a new checkin attendance, the last checkin
      //must be at least 24hrs less than the new checkin time;
          const lastCheckIn = user.attendance[user.attendance.length - 1];
          const lastCheckInTimestamp = lastCheckIn.entry.getDate()
          const day = new Date()
          console.log(day, lastCheckInTimestamp);
          if (day.getDate() > lastCheckInTimestamp + 100) {
            user.attendance.push(data);
            await user.save();
            res.json(user)
           
            
          } else {
            res.status(400).send( "You have signed in today already");
            
          }
      }else{
          user.attendance.push(data);
          await user.save();
        //   res.send('You have been signed in for today')
          res.json(user)
      }
    
    } catch (error) {
      console.log("something went wrong");
      console.log(error);
    }
  });

module.exports = router