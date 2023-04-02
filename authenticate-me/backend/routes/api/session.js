//holds the resources for the route paths beginning with /api/session
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// this is where the user is submitting a post request to the router with their username/email & pcode
router.post('/', async (req, res, next) => {

    // deconstruct the credential & password from the request body
    const { credential, password } = req.body;

    let user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    })

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials are invalid.' }
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });

});

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'});
});


module.exports = router;
