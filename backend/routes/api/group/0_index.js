const router = require('express').Router();
const { restoreUser } = require('../../../utils/auth');

router.use(restoreUser);

// ============== DELETE ==============


// ============== GET ==============

const getAllGroups = require('./get_all_groups.js');
router.use('/', getAllGroups);

// ============== POST ==============

const postNewGroup = require('./post_new_group.js');
router.use('/', postNewGroup);

// ============== PUT ==============

module.exports = router;
