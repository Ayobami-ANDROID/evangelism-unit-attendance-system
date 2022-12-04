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
    attendance:[
        {
            date:{
                type:Date,
                default:Date.now(),
            },
            entry:{type:Date}
        }
    ]

})

module.exports = mongoose.model('user',userSchema)