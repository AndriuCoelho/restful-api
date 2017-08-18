const moment = require('moment')
// Custom Logger

const myLogger = function (req, res, next) {
  console.log(`${moment().format('lll')} ==> ${req.method} ${req.url}`)
  next()
}

module.exports = myLogger
