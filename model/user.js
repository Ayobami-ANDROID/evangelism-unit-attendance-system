const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'firstname is required']
    },
    lastname:{
        type:String,
        required:[true,'lastname is required']
    },
    regNo:{
        type:String,
        required:[true,'Registration number is required']
    },
    matricNo:{
        type:String,
        required:[true,'Matriculation number is required']
    },
    level:{
        type:Number,
        required:[true,'Level is required']
    },
    hall:{
        type:String,
        required:[true,'hall is required']
    },
    roomNO:{
        type:String,
        required:[true,'room is required']
    },
    webmail:{
        type:String,
        required:[true,'webmail is required']
    },
    attendance:[
        {
           
            entry:{type:Date},
            month:{
                type:String
            },
            day:{
                type:String
            },
            year:{
                type:Number
            }

        }
    ]

})

module.exports = mongoose.model('user',userSchema)