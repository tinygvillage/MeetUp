const router = require('express').Router();
// const { restoreUser } = require('../../../utils/auth');

// // router.use(restoreUser);

// ============== DELETE ==============


// ============== GET ==============

// remember ** order still matters even though they're imported

const getAllGroups = require('./get_all_groups');
router.use(getAllGroups);

const getAllGroupsByCurrentUser = require('./get_all_groups_joined_organized_current_user.js');
router.use(getAllGroupsByCurrentUser);

const getGroupById = require('./get_group_by_id.js');
router.use(getGroupById);


// ============== POST ==============

const postNewImageToGroup = require('./post_new_image_to_group');
router.use(postNewImageToGroup);

const postNewGroup = require('./post_new_group.js');
router.use(postNewGroup);

// ============== PUT ==============

module.exports = router;
