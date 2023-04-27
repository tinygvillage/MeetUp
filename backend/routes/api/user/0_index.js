const router = require('express').Router();
const { restoreUser } = require('../../../utils/auth');


router.use(restoreUser);

// ============== DELETE ==============


// ============== GET ==============


// ============== POST ==============

const postSignup = require('./post_signup.js');
router.use('/', postSignup);

// ============== PUT ==============

module.exports = router;
