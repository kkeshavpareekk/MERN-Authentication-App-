const router = require("express").Router();

// import controllers
const { login, singUp, verifyToken, logout } = require("../controllers/userController");

router.route("/login").post(login);
router.route("/register").post(singUp);
router.route("/logout").get(logout);
router.route("/verifytoken").get(verifyToken);

module.exports = router;
