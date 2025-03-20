const express = require("express");
const {
  signupUser,
  loginUser,
  verifyMail,
  requestPassReset,
  resetPassword,
  checkUser,
  changePassword,
} = require("../controllers/User");
const { isAuth } = require("../middlewares/checkAuth");
const router = express.Router();

router
  .post("/signup", signupUser)
  .post("/login", loginUser)
  .put("/update-password", isAuth, changePassword)
  .get("/verify-email/:token", verifyMail)
  .post("/request-reset", requestPassReset)
  .post("/password-reset/:token", resetPassword)
  .get("/me", isAuth, checkUser);

module.exports = router;
