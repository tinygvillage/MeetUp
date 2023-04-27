const express = require('express');
const router = express.Router();

// middleware
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');

//sequelize
const { User } = require('../../db/models');
const { Op } = require('sequelize');

// signup endpoint
router.post('', validateSignup, async (req, res, next) => {

    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    if (!firstName) return res.status(400).json({ message: "First Name is required" })
    if (!lastName) return res.status(400).json({ message: "Last Name is required" })

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


        // create a safeUser object to house frontend viewable data about new user
        const safeUser = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            username: newUser.username,
        };
        const token = await setTokenCookie(res, safeUser)
        safeUser.token = token;

        // return the user with the safeUser object
        return res.json({ user: safeUser });
    }
});

module.exports = router;
