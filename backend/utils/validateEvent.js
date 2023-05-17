const { handleValidationErrors } = require('./handleValidationErrors');
const { check } = require('express-validator');

const validateEvent = [
    check('venueId')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom(async id => {
            const venue = await Venue.findByPk(id);
            if (!venue) {
                throw new Error('Venue does not exist');
            }
            return true;
        })
        .withMessage('Venue does not exist'),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    check('type')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isIn(["In Person", "Online"])
        .withMessage("Type must be 'In Person' or 'Online'"),
    check('capacity')
        .exists({ checkFalsy: true })
        .isInt()
        .withMessage("Capacity must be a number"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists()
        .custom(value => typeof value !== 'undefined')
        .isInt()
        .withMessage("Not a valid price"),
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom(date => {
            const startingDate = parseDate(date);
            if (startingDate <= new Date()) {
                throw new Error("Start date must be set in the future.");
            }
            return true;
        })
        .withMessage("Start date must be set in the future."),
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((date, { req }) => {
            const endDate = parseDate(date);
            const startDate = parseDate(req.body.startDate);
            if (endDate <= startDate) {
                throw new Error("End date must be after the start date.")
            }
            return true;
        })
        .withMessage("End date must be after the start date."),
    handleValidationErrors
];

module.exports = { validateEvent };
