//import the dotenv package
require("dotenv").config();

//create all the necessary configuration variables
const MongoDB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET=process.env.JWT_SECRET;
//export
module.exports = {
  MongoDB_URI,
  PORT,
  JWT_SECRET
};
