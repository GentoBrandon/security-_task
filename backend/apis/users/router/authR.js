const express = require('express');
const verifySingnUp = require('../middleware/verifySignUp');
const router = express.Router();
const authController = require('../controller/userAuth');
router.post(
  '/signup',
  [verifySingnUp.verifyUserName],
  authController.signUp
);
router.post('/signin', authController.signIn);

module.exports = router;
