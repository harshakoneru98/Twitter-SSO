// Importing express package
const express = require('express');

// Router-level middleware works in the same way as application-level middleware,
// except it is bound to an instance of express.Router().
const router = express.Router();

// Authentication Controller
const AuthController = require('../controllers/authController');

router.post('/request_token', AuthController.request_token);
router.post('/access_token', AuthController.access_token);
router.post('/logout', AuthController.logout);
router.get('/getProfileInfo', AuthController.getProfileInfo);

module.exports = router;
