const PORT = 8080
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const express = require('express')
const moment = require('moment')
const bodyParser = require('body-parser')
const app = express()

// Mongoose Connect
mongoose.connect('mongodb://localhost/local', { useMongoClient: true,})

// Customer Schema
const customerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  birthDay: Date,
  weight: Number,
  height: Number,
  sex: String,
  rich: Boolean,
  createAt: { type: Date, default: Date.now }
})

// Customer Model (Interface)

const costumerModel = mongoose.model('costumers', customerSchema)
console.log(costumerModel)



// Middlewares
// Custom Logger

const myLogger = function(req, res, next) {
  console.log(`${moment().format('lll')} ==> ${req.method} ${req.url}`)
  next()
}

app.use(myLogger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

console.log(mongoose)

// Routes
// GET/
app.get('/', (req, res) => {
  res.send('RESTful API')
})

// ALL

// app.all('/costumers', (req, res, next) => {
// *** esse cara passa antes de todos os end points
//   console.log(`${req.method} /costumers`)
//   next()
// })

app.get('/costumers', (req, res) => {

  // console.log(req.query)

  costumerModel.find(function(err, docs) {
    if (err) res.sendStatus(404)
    res.status(200).send(docs)
  })
})

// GET /costumers/1

app.get('/costumers/:id', (req, res) => {
  costumerModel.findById(req.params.id, function(err, costumer) {
    if (err) res.sendStatus(404)
    res.status(200).send(costumer)
  })
})

// POST /costumers

app.post('/costumers', (req, res) => {
  costumerModel.create(req.body, function(err, costumer) {
    if (err) res.sendStatus(412)
    res.status(201).send(costumer)
  })
})

// PUT /costumers/1

app.put('/costumers/:id', (req, res) => {
  costumerModel.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if (err) res.sendStatus(404)
    res.sendStatus(204)
  })
})

// DELETE /costumers/1
app.delete('/costumers/:id', (req, res) => {
  costumerModel.findByIdAndRemove(req.params.id, function(err) {
    if (err) res.sendStatus(404)
    res.sendStatus(204)
  })

  // res.status(204).end()
})


// GET /costumers
app.listen(8080, () => {
  // console.log('Servidor rodando na porta ' + PORT + '...')

  // ES6 Template String:

  console.log(`Servidor rodando na porta ${PORT}`)
})


// http://localhost:8080/costumers/?name=Xuxa
