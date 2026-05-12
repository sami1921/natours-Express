const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const tour = require('../../model/tourModel');
dotenv.config({ path: '../../config.env' });
/*
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);*/
const DB = process.env.DATABASE_LOCAL;
const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'));
const importData = async () => {
  try {
    await tour.create(tours);
    console.log('data successfuly logged');
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await tour.deleteMany();
    console.log('data successfuly deleted');
  } catch (err) {
    console.log(err);
  }
};

//console.log(process.argv);
mongoose.connect(DB).then(async (con) => {
  //console.log(con.connections);
  console.log('connection to the database sucesses');
  if (process.argv[2] === '--import') {
    await importData();
  } else if (process.argv[2] === '--delete') {
    await deleteData();
  }
  process.exit();
});
