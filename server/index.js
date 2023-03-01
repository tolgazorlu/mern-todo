const express = require("express")
require("dotenv").config()
const app = express()
const noteRoute = require('./routes/notes')
const mongoose = require("mongoose")

//Middleware
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB Bağlandı")

    app.listen(process.env.PORT, () => {
        console.log(`${process.env.PORT}. port çalışıyor!`)
    })
    
}).catch(err => {
    console.log(err)
})

app.use('/api/notes',noteRoute)