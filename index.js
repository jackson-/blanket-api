// First, we require and configure dotenv, which will load variables from .env to process.env
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// This needs to be imported to run the DB
const db = require('./sequelize')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(cors())
// API ENDPOINTS
app.use('/api', require('./routes'));

app.listen(process.env.PORT || 5000)