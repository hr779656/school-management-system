const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.port || 4000


app.listen(port, ()=>{
    console.log(`server Run on This Port: ${port}`)
})

