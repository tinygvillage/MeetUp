const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const { restoreUser } = require('../../utils/auth.js');
// const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
// const { User } = require('../../db/models');


// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupsRouter);


// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// });

// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
// });

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
