module.exports = function (app, productModel) {
  // Products Routes

  app.get('/products', (req, res) => {
    productModel.find(function (err, products) {
      res.status(200).send(products)
    })
  })

  app.get('/products/:id', (req, res) => {
    productModel.findById(req.params.id, function (err, product) {
      if (err) res.sendStatus(404)
      res.status(200).send(product)
    })
  })

  app.post('/products', (req, res) => {
    productModel.create(req.body, function (err, product) {
      if (err) res.sendStatus(412)
      res.status(201).send(product)
    })
  })

  app.put('/products/:id', (req, res) => {
    productModel.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if (err) res.sendStatus(404)
      res.sendStatus(204)
    })
  })

  app.delete('/products/:id', (req, res) => {
    productModel.findByIdAndRemove(req.params.id, req.body, function (err) {
      if (err) res.sendStatus(404)
      res.sendStatus(204)
    })
  })
}
