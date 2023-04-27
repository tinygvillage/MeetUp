const router = require('express').Router();
const { setTokenCookie } = require('../../../utils/auth');
const { validateLogin, authorizedUser } = require('../../../utils/validation');

router.post('/', validateLogin, async (req, res, next) => {

    const user = await authorizedUser(req, res, next);

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        message: "Logged in:",
        user: safeUser
    });

});


module.exports = router
