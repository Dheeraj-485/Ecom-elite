const { uploadToCloudinary } = require("../config/cloudinary");
const Products = require("../models/Products");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, brand, stock, variations } =
      req.body;

    if (!title || !description || !price || !category || !brand || !stock) {
      return res.status(400).json({ message: "Fields are required" });
    }

    let { thumbnail } = req.files;
    const allowedFormats = [
      "image/png",
      "image/jpg",
      "image/webp",
      "image/jpeg",
    ];
    if (!allowedFormats.includes(thumbnail.mimetype)) {
      return res.status(401).json({ message: "Invalid file type" });
    }
    try {
      if (req.files) {
        const result = await uploadToCloudinary.uploader.upload(
          req.files.thumbnail.tempFilePath,
          {
            folder: "ecom-elite",
          }
        );
        thumbnail = result.secure_url;
      }
      console.log(thumbnail);
    } catch (error) {
      console.error("Error uploading thumbnail to cloudianry", error.message);
      return res.status(500).json({
        message: "Error uploading thumbnail to cloudinary",
        error: error.message,
      });
    }

    // let images = [];

    // if (req.files) {
    //   for (let i = 0; i < req.files.length; i++) {
    //     const file = req.files[i];

    //     const result = await uploadToCloudinary.uploader.upload(file.path);

    //     if (i === 0) {
    //       //use the first image as a thumbnail
    //       thumbnail = { public_id: result.public_id, url: result.secure_url };
    //     } else {
    //       images.push({ public_id: result.public_id, url: result.secure_ });
    //     }
    //   }
    // }

    // if (req.files) {
    //   const result = await uploadToCloudinary.uploader.uploader(
    //     req.files.thumbnail.tempFilePath,
    //     {
    //       folder: "ecom-elite",
    //     }
    //   );
    //   thumbnail = result.secure_url;
    // }
    console.log("Received data:", req.body);
    console.log("Received files:", req.files);

    const newProduct = new Products({
      title,
      description,
      price,
      category,
      brand,
      stock,
      //   variations: JSON.parse(variations),
      thumbnail: { url: thumbnail },
      //   images,
    });

    const doc = await newProduct.save();
    console.log("Doc", doc);

    return res
      .status(201)
      .json({ message: "Product created successfully", doc });
  } catch (error) {
    return res.status(500).json({
      message: "Server error - create product failed",
      error: error.message,
    });
  }
};

//get all products with filters
exports.getProducts = async (req, res) => {
  try {
    const query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.brand) {
      query.brand = req.query.brand;
    }
    const products = await Products.find(query).sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Error finding products by sort:",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id).populate("reviews.user");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product found  by id: ", product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error - product by id", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // const findProduct = await Products.findById(id);

    let thumbnail;

    try {
      if (req.files) {
        const file = req.files.thumbnail;

        const allowedFormats = [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
        ];
        if (!allowedFormats.includes(file.mimetype)) {
          return res.status(401).json({ message: "Invalid file type" });
        }
        const result = await uploadToCloudinary.uploader.upload(
          file.tempFilePath,
          {
            folder: "ecom-elite",
          }
        );
        thumbnail = result.secure_url;
      }
      console.log(thumbnail);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error updating thumbnail", error: error.message });
    }
    const updateData = { ...req.body };
    if (thumbnail) {
      updateData.thumbnail = { url: thumbnail };
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    const doc = await updatedProduct.save();
    return res
      .status(200)
      .json({ message: "Product updated successfully", doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// @desc Delete a product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.addReview = async (req, res) => {
//   try {
//   } catch (error) {}
// };

// @desc Add a review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = { user: req.user._id, name: req.user.name, rating, comment };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.numReviews;

    await product.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
