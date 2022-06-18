const express = require("express");
const {
  registerUser,
  loginUser,
  followuser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/forgot/password").post(forgotPassword);
router.route("/reset/password/:token").put(resetPassword);

// Make Get request for admin to access all users
router.route("/admin/users").get(isAuthenticated,getAllUsers);

// Make Get request for admin to access single user, update user role, delete user
router
    .route("/admin/user/:id")
    .get(isAuthenticated,getUserProfile)
    .put(isAuthenticated,updateUserRole)
    .delete(isAuthenticated,deleteUser);

module.exports = router;
