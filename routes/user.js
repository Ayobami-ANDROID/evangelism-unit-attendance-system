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

    const {firstname,lastname,regNo,matricNo,level,hall,roomNO,webmail}= req.body
    if(!firstname || !lastname || !regNo || !matricNo || !level ||!hall || ! roomNO || !webmail){
        res.status(400).send('all fields are required')
    }
    const user = await User.create(req.body)
    res.status(200).json({user})
})

router.delete('/deleteUser/:id', async(req,res)=>{
    const user = await User.findByIdAndDelete({_id:req.params.id})
    if(!user){
        res.status(400).send('This user does exist')
    }
    res.status(200).send('user has been deleted')
    
})

router.post("/:id/enter", async (req, res) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
  const date = new Date()
 
  
    try {
      const data = {
        entry: Date.now(),
        month:monthNames[date.getMonth()],
        day:dayNames[date.getDay()],
        year: date.getFullYear()
    
      };
      const user = await User.findById(req.params.id);
      // console.log(user)
  
      //if the user has an attendance array;
     
      if(user.attendance && user.attendance.length > 0){
      //for a new checkin attendance, the last checkin
      //must be at least 24hrs less than the new checkin time;
          const lastCheckIn = user.attendance[user.attendance.length - 1];
          const lastCheckInTimestamp = lastCheckIn.entry.getTime()
          const day = new Date()
          console.log(day, lastCheckInTimestamp);
          if (day.getTime() > lastCheckInTimestamp + 100) {
            user.attendance.push(data);
            await user.save();
            res.status(200).send('you have successfully signed in today')
           
            
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

  router.get('/getallattendance', async (req,res)=>{
    const {months,years,days} = req.query
    const Year = Number(years)
   const totalAttendance = await User.find({attendance:{ $elemMatch:{month:months,day:days,year:Year}}})
   
   res.json({totalAttendance})
   
  })

  router.put('/updateUser/:id',async(req,res) =>{
    const user = User.findByIdAndUpdate({_id:req.params.id},req.body,{
      new:true,runValidators:true
    })

    res.status(201).json({msg:'user updated',user})
  })

module.exports = router