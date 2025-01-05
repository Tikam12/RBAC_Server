const express = require("express");
const router = express.Router();
const { handleUserSignup,handleUserLogin,handleUserLogout } = require("../controllers/user")
// const {restrictToReLogin} = require("../middlewares/auth");

router.post("/signup", handleUserSignup );
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);

module.exports = router;