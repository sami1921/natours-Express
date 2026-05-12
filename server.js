const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('unCoughtREJECTION! Shutting down...');
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');
//console.log(process.env);
/*const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);*/
const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB).then((con) => {
  //console.log(con.connections);
  console.log('connection to the database sucesses');
});
const server = app.listen(3000, () => {
  console.log('app running on port 3000');
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unHandled REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
