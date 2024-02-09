const mongoose = require("mongoose");

//export the mongoose connecting string

module.exports = async (MONGO_URL) => {
  try {
    const tested = await mongoose.connect(MONGO_URL);
    mongoose.createConnection()
    if (tested) {
      console.log("DB connected successfully");
    }
    return true;
  } catch (err) {
    console.log("<::: couldnt connect to database", err.message);
    return false;
  }
};
