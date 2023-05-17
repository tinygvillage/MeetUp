const { handleValidationErrors } = require('./handleValidationErrors');
const { check } = require('express-validator');

const validateImage = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Image Url is required')
        .custom(url => {
            if (!isValidURL(url)) {
                throw new Error('Invalid URL');
            }
            return true;
        })
        .withMessage('Invalid URL'),
    handleValidationErrors
];

module.exports = { validateImage };
