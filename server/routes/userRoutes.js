const express = require("express");
const {
  signupUser,
  loginUser,
  verifyMail,
  requestPassReset,
  resetPassword,
  checkUser,
} = require("../controllers/User");
const { isAuth } = require("../middlewares/checkAuth");
const router = express.Router();

router
  .post("/signup", signupUser)
  .post("/login", loginUser)
  .get("/verify-email/:token", verifyMail)
  .post("/request-reset", requestPassReset)
  .post("/password-reset/:token", resetPassword)
  .get("/me", isAuth, checkUser);

module.exports = router;
