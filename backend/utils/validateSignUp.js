const { handleValidationErrors } = require('../utils/handleValidationErrors');
const { check } = require('express-validator');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide username with at least 4 characters'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('firstName cannot be an email.'),
    check('lastName')
        .not()
        .isEmail()
        .withMessage('lastName cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

module.exports = { validateSignup };
