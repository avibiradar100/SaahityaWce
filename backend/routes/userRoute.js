const express=require('express');
const { registerUser, loginUser, followuser, logout, updatePassword, updatePofile, deleteMyProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword } = require('../controllers/userController');
const {isAuthenticated}=require('../middleware/auth')
const router=express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/update/password').put(isAuthenticated,updatePassword);
router.route('/update/profile').put(isAuthenticated,updatePofile);
router.route('/delete/me').delete(isAuthenticated,deleteMyProfile);
router.route('/me').get(isAuthenticated,myProfile);
router.route('/user/:id').get(isAuthenticated,getUserProfile);
router.route('/users').get(isAuthenticated,getAllUsers);
router.route('/forgot/password').post(forgotPassword);
router.route('/reset/password/:token').put(resetPassword)

module.exports = router;