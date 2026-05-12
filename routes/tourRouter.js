const express = require('express');
const tourControler = require('../controlers/tourControler');
const router = express.Router();
//router.param('id', tourControler.checkId);

router
  .route('/top-5-cheap')
  .get(tourControler.aliasTopTours, tourControler.getAllTour);
router.route('/tour-stats').get(tourControler.getTourStats);
router.route('/monthly-plan/:year').get(tourControler.getMonthlyPlan);
router.route('/').get(tourControler.getAllTour).post(tourControler.createTour);
router
  .route('/:id')
  .get(tourControler.getTour)
  .patch(tourControler.updateTour)
  .delete(tourControler.deleteTour);
module.exports = router;
