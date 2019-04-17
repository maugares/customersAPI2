const { Router } = require('express')
const Company = require('./model')

const router = new Router()

const errorMessage = () => {
  return (res.status(404).send({
    message: `Company does not exist`
  }))
}

router.get('/companies', (req, res, next) => {
  Company
    .findAll()
    .then(companies => {
      res.send({ companies })
    })
    .catch(error => next(error))
})

router.get('/companies/:id', (req, res, next) => {
  Company
    .findByPk(req.params.id)
    .then(company => {
      if (!company) {
        errorMessage()
      }
      return res.send(company)
    })
    .catch(error => next(error))
})

router.post('/companies', (req, res, next) => {
  Company
    .create(req.body)
    .then(company => {
      if (!company) {
        errorMessage()
      }
      return res.status(201).send(company)
    })
    .catch(error => next(error))
})

router.put('/companies/:id', (req, res, next) => {
  Company
    .findByPk(req.params.id)
    .then(company => {
      if (!company) {
        errorMessage()
      }
      return company.update(req.body).then(company => res.send(company))
    })
    .catch(error => next(error))
})

router.delete('/companies/:id', (req, res, next) => {
  Company
    .findByPk(req.params.id)
    .then(company => {
      if (!company) {
        errorMessage()
      }
      return company.destroy()
        .then(() => res.send({
          message: `Company was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router