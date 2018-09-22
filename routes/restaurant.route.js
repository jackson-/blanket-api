const router = require('express').Router();
const restaurantCtrl = require('../controllers/restaurant.controller');

router
  .route('/')
  .get(restaurantCtrl.getAll)
  .post(restaurantCtrl.create)

router
  .route('/rate')
  .post(restaurantCtrl.rate)

router
  .route('/search')
  .get(restaurantCtrl.search)

router
  .route('/view/:id')
  .get(restaurantCtrl.getById)

module.exports = router;
