// will hold the resources for the route paths beginning with /api/users

const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

// signup endpoint
router.post('', validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const findUser = await User.findOne({
        where: {
            [Op.or]: {
                username,
                email
            }
        }
    })

    if (findUser) {
        return res.status(403).json({ message: "Username or Email already exists" })
    } else {
        const newUser = await User.create({ firstName, lastName, username, email, hashedPassword });

        const token = await setTokenCookie(res, safeUser)
        // create a safeUser object to house frontend viewable data about new user
        const safeUser = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            username: newUser.username,
            token: token
        };


        // return the user with the safeUser object
        return res.json({ user: safeUser});
    }
});


module.exports = router;
