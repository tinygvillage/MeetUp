// //holds the resources for the route paths beginning with /api/session
// const express = require('express').Router();
// const bcrypt = require('bcryptjs');
// const { setTokenCookie, requireAuth } = require('../../../utils/auth');
// const { validateLogin, authorizedUser } = require('../../../utils/validation');

// // Login
// router.post('/', validateLogin, async (req, res, next) => {

//     // deconstruct the credential & password from the request body
//     // const { credential, password } = req.body;

//     const user = await authorizedUser(req, res, next);

//     // await User.unscoped().findOne({
//     //     where: {
//     //         [Op.or]: {
//     //             username: credential,
//     //             email: credential
//     //         }
//     //     }
//     // })

//     // if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
//     //     const err = new Error("Login failed");
//     //     err.status = 401;
//     //     err.title = 'Login failed';
//     //     err.errors = { credential: 'The provided credentials are invalid.' }
//     //     return next(err);
//     // }

//     const safeUser = {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         username: user.username
//     };

//     await setTokenCookie(res, safeUser);

//     return res.json({
//         message: "Logged in:",
//         user: safeUser
//     });

// });

// router.delete('/', (_req, res) => {
//     res.clearCookie('token');
//     return res.json({ message: 'success' });
// });

// router.get('/', requireAuth, async (req, res) => {
//     const { user } = req;

//     await setTokenCookie(res, user);

//     if (user) {
//         const safeUser = {
//             id: user.id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             username: user.username
//         };

//         return res.json({ user: safeUser });
//     } else return res.json({ user: null })
// });


// module.exports = router;
