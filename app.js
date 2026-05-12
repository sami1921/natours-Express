const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controlers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const { fail } = require('assert');
const app = express();
//Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan());
}

app.use(express.json());
//app.get("/api/v1/tours", getAllTour);
//app.get("/api/v1/tours/:id", getTour);
//app.post("/api/v1/tours", createTour);
//app.patch("/api/v1/tours/:id", updateTour);
//app.delete("/api/v1/tours/:id", deleteTour);

//routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  //res.status(404).json({
  // status: 'fail',
  // message: `can't find ${req.originalUrl} on this server`,
  //});
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
