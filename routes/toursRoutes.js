const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');
// const {getAllTours,createTour,getTour,updateTour,deleteTour} = require('./../controllers/tourController')

// router.param('id', tourController.checkId);
//Check body middleware for posted routes

router
  .route('/tour-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTouresStats);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
