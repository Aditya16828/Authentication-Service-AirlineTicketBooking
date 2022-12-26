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
router.delete(
    '/delete',
    AuthValidator.validateUserSignup,
    UserController.remove
);
router.get(
    '/isAdmin',
    AuthValidator.validateIsAdminrequest,
    UserController.isAdmin
);

module.exports = router;
