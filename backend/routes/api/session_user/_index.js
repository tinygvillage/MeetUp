const router = require('express').Router();
const { restoreUser } = require('../../../utils/auth');

router.use(restoreUser);

// ============== DELETE ==============

const deleteSession = require('./delete_logout.js')
router.use('/', deleteSession);

// ============== GET ==============

const getCsrfToken = require('./get_csrf_token');
router.use('/csrf/restore', getCsrfToken);

const getCurrentUser = require('./get_current_user');
router.use('/', getCurrentUser);

// ============== POST ==============

const postLogin = require('./post_login');
router.use('/', postLogin);

// ============== PUT ==============

module.exports = router;
