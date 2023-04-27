const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../../utils/auth');

router.get('/', requireAuth, async (req, res) => {
    const { user } = req;

    await setTokenCookie(res, user);

    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        };

        return res.json({ user: safeUser });
    } else return res.json({ user: null })
});

module.exports = router;
