const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'a tour must have a duration'],
  },
  MaxGroupSize: {
    type: Number,
    //required: [true, 'a tour must have a group size'],
  },
  ratingAvearage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'a tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'a tour must have a summary'],
  },
  discription: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'a tour must have a cover'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: [Date],
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
