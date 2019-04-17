const { Router } = require('express')
const { toJWT, toData } = require('./jwt')

const router = new Router()

// define endpoints here

// Create a user Token on login
router.post('/logins', (req, res, next) => {
  const login = toJWT(req.body)
  if (!login) {
    return res.status(404).send({
      message: 'Please supply a valid email and password'
    })
  } else {
    return res.send({
      jwt: toJWT({ userId: 1 })
    })
  }
})

// Restrict access to users with a valid Token
router.get('/secret-endpoint', (req, res) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      res.send({
        message: 'Thanks for visiting the secret endpoint',
        data
      })
    }
    catch(error) {
      res.status(400).send({
        message:  `Error ${error.name}: ${error.message}`,
      })
    }
  } else {
    res.status(400).send({
      message: 'Please supply some valid credentials'
    })
  }
})


module.exports = router