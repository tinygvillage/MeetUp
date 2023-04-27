const router = require('express').Router();
const { restoreUser } = require('../../../utils/auth');

router.use(restoreUser);

// ============== DELETE ==============

const deleteSession = require('./delete_session_cookie.js')
router.use('/', deleteSession);

// ============== GET ==============

const getCurrentUser = require('./get_current_user');
router.use('/', getCurrentUser);

// ============== POST ==============

const postLogin = require('./post_login');
router.use('/', postLogin);

// ============== PUT ==============

module.exports = router;
