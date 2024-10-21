const { check } = require('express-validator');

const SignUpFormValidate = [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lasstName', 'First name is required').not().isEmpty(),
    check('email', 'First name is required').not().isEmpty(),
    check('address', 'First name is required').not().isEmpty(),
    check('password', 'First name is required').not().isEmpty(),
    check('phoneNumber', 'First name is required').not().isEmpty(),
]


module.exports = SignUpFormValidate;
