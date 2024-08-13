const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkId = (req, res, next, val) => {
//   console.log(`This is Tour ID: ${val}`);
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     return res.status(404).json({ status: 'fail', messasge: 'Invalid ID' });
//   }
//   next();
// };
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Bulding query
    // 1) Filtering
    // const queryObj = { ...req.query };
    // const exclutedFields = ['page', 'sort', 'limit', 'fields'];
    // exclutedFields.forEach((el) => {
    //   delete queryObj[el];
    // });
    // // 2) Advance Filtering

    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // let query = await Tour.find(JSON.parse(queryStr));
    // console.log(query, 'fields quries');

    // // 3) Sorting
    // if (req.query.sort) {
    //   const sortby = req.query.sort.split(',').join(' ');
    //   console.log(sortby, 'sort by quries');

    //   query = await query.sort(sortby);
    //   console.log(query, 'sort by quries');
    //   //sort('price')
    // }
    // // else {
    // //   console.log('from else');
    // //   query = await query.sort('ratingAverage');
    // // }

    // if (req.query.fields) {
    //   // const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(req.query.fields);
    //   console.log(req.query.fields);
    // }
    // // else {
    // //   query = await query.select('-__v');
    // // }

    // // 4) Pagination
    // // page=2&limit=10 (1-10, ,page 1,)( 10-20 ,page 2, )

    // // console.log(req.query);
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // if (req.query.page) {
    //   query = query.skip(skip).limit(limit);
    //   const numTours = await tours.countDocuments();
    //   if (skip >= numTours) {
    //     throw new Error('THis page does not exist ');
    //   }
    // }

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.getTour = async (req, res) => {
  // const id = req.params.id * 1; // In JS if we want to convert the number which is in no string form we simply multiply it by 1/
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: 'Error' });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour: updatedTour },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid Data Sent!' });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', message: 'Tour Deleted' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid Id Sent!' });
  }
};
