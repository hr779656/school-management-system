const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.port || 4000
const routes = require('./routes/allroutes')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)

app.listen(port, ()=>{
    console.log(`server running on localhost:${port}`)
})

