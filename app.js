const mongoose = require('mongoose')
const Schema = mongoose.Schema
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const myLogger = require('./middlewares/my-logger.js')

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

const productSchema = new Schema({
  name: String,
  vendor: String,
  quantity: Number,
  price: Number,
  weight: Number,
  purchaseData: Date,
  manufactureData: Date,
  createAt: { type: Date, default: Date.now }
})

// Customer Model

const costumerModel = mongoose.model('costumers', customerSchema)

// App Config
const fs = require('fs')
const env = require('node-env-file')
const envFile = __dirname + '/.env'
if (fs.existsSync(envFile)) env(envFile)

app.set('PORT', process.env.PORT)
app.set('MONGO_CONNECTION', process.env.MONGO_CONNECTION)

// Mongoose Connect
mongoose.connect(app.get('MONGO_CONNECTION'), { useMongoClient: true, })

// Product Model

const productModel = mongoose.model('products', productSchema)

// Register Middlewares
app.use(myLogger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


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




// Importing Routes
require('./routes/costumers')(app, productModel)

app.listen(app.get('PORT'), () => {
  // console.log('Servidor rodando na porta ' + PORT + '...')

  // ES6 Template String:

  console.log(`Servidor rodando na porta ${app.get('PORT')}...`)
})


// http://localhost:8080/costumers/?name=Xuxa
