const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Db connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connection;
