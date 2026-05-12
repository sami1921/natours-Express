//const fs = require('fs');
//const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));
const Tour = require('../model/tourModel');
const apiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
//console.log(tours);
/*exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  next();
};*/
/*exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name',
    });
  }
  next();
};*/
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAvearage,price';
  req.query.fields = 'name,price,ratingAvearage,summary,difficulty';
  next();
};

exports.getAllTour = catchAsync(
  async (req, res, next) => {
    // try {
    //
    //
    //
    const features = new apiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .pageinate();
    const tours = await features.query;
    res.json({
      status: 'sucess',
      result: tours.length,
      data: {
        tours,
      },
    });
  }, //catch (err) {
  //res.status(404).json({
  //  status: 'fail',
  //  message: 'invalid data sent',
  // });
  // }
);
exports.getTour = catchAsync(
  async (req, res, next) => {
    /*const id = req.params.id * 1;
  console.log(id);
  const tour = tours.find((tourr) => {
    return tourr.id === id;
  });
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }*/
    //try {

    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      console.log('there is noo tour');
      return next(new AppError('No tour is found by this id', 404));
    }
    res.status(200).json({
      status: 'sucess',
      data: {
        tour,
      },
    });
  }, // catch (err) {
  //res.status(404).json({
  //status: 'fail',
  //message: 'invalid id',
  //});
  //}
);
exports.createTour = catchAsync(
  async (req, res, next) => {
    //try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'sucess',
      data: {
        tour: newTour,
      },
    });
  } /*catch (err) {
  res.status(401).json({
  status: 'fail',
  message: 'invalid data sent',
   });
  }*/,
);
exports.updateTour = catchAsync(
  async (req, res, next) => {
    //try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tour) {
      return next(new AppError('No tour is found by this id', 404));
    }
    res.status(200).json({
      status: 'sucess',
      data: {
        tour,
      },
    });
  } /*catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }*/,
);
exports.deleteTour = catchAsync(
  async (req, res, next) => {
    //try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return next(new AppError('No tour is found by this id', 404));
    }
    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  } /*catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }*/,
);
exports.getTourStats = async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $difficulty },
          num: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: $price },
          maxPrice: { $max: '$price' },
        },
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(204).json({
      status: 'sucess',
      data: stats,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startdates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      { $sort: { numTourStarts: -1 } },
      {
        $limit: 6,
      },
    ]);
    res.status(204).json({
      status: 'sucess',
      data: plan,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
