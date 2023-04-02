// will hold the resources for the route paths beginning with /api/users

const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// signup endpoint
router.post('', async (req, res, next) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const newUser = await User.create({ username, email, hashedPassword });

    // create a safeUser object to house frontend viewable data about new user
    const safeUser = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
    };

    await setTokenCookie(res, safeUser)

    // return the user with the safeUser object
    return res.json({user: safeUser});

});


module.exports = router;
