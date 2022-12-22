const express = require('express');
const {UserController} = require('../../controllers/index');
const {AuthValidator} = require('../../middlewares/index');

const router = express.Router();

router.post(
    '/signup',
    AuthValidator.validateUserSignup,
    UserController.create
);
router.post(
    '/signin',
    AuthValidator.validateUserSignup,
    UserController.signin
);

module.exports = router;
