const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongo_URI);
    console.log("Db connected successfully.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
