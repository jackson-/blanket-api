const api = require('express').Router();

module.exports = api
  .use('/health-check', (req, res) => res.send('OK'))
  .use('/restaurants', require('./restaurant.route'))