const router = require('express').Router();
const restaurantCtrl = require('../controllers/restaurant.controller');

router
  .route('/')
  .post(restaurantCtrl.create)

router
  .route('/rate')
  .post(restaurantCtrl.rate)

router
  .route('/:id')
  // GET a single brand by id

module.exports = router;
