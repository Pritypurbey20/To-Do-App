const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

//connecting to database:

mongoose.connect('mongodb://localhost:27017/Todo-app-db');

//Importing Routes:

const router = require('./routes/routes')

//route middleware:

app.use('/',router)

app.listen(8000,()=>console.log('Listening to the port..'))




