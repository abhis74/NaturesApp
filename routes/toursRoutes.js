const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');
// const {getAllTours,createTour,getTour,updateTour,deleteTour} = require('./../controllers/tourController')

// router.param('id', tourController.checkId);
//Check body middleware for posted routes

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
