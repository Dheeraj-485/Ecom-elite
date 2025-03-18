const mongoose = require("mongoose");
require("dotenv").config();
exports.db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Error connecting to mongodb", err.message));
};
