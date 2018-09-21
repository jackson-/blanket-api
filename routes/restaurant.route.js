const router = require('express').Router();
const restaurantCtrl = require('../controllers/restaurant.controller');

router
  .route('/')
  .post(restaurantCtrl.create)

router
  .route('/:id')
  // GET a single brand by id

module.exports = router;
