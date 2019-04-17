const express = require('express')
const bodyParser = require('body-parser')
const customersRouter = require('./customers/routes')
const companiesRouter = require('./companies/routes')
const loginsRouter = require('./auth/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(customersRouter)
  .use(companiesRouter)
  .use(loginsRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))
