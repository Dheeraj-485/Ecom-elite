const express = require("express");
const app = express();
const cors = require("cors");
const { db } = require("./config/db");
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true, // Enable temporary file storage
    tempFileDir: "/tmp/", // Specify temp directory
  })
);
app.use(cors());
db();

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
