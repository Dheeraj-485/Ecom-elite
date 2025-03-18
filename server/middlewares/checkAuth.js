const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
require("dotenv").config();

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "Token not found or expired" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!decoded) {
      res
        .status(401)
        .json({ message: "Not autherized user- token not matching" });
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Authorization error", error: error.message });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(401).json({ message: "Access denied-- admin required" });
  next();
};
