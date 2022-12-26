const { urlencoded } = require('express');
const express = require('express');
const app = express();
const connectDB = require('./connectDB/connectDb')
require('dotenv').config()
const user = require('./routes/user')

app.use(express.json())

const port = process.env.PORT || 3000


app.use('/attendance',user)
const start = async () =>{
    await connectDB(process.env.Mongo_Url)
    app.listen(port,()=>{
        console.log('listening on 3000')
    })
}
start()
