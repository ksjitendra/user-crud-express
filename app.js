const express = require('express')
const app = express()
require('dotenv/config')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const apiRoutes = require('./routes/api-routes')

app.use('/v1', apiRoutes)
module.exports = app