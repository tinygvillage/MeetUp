const router = require('express').Router();
const { restoreUser } = require('../../../utils/auth');

// router.use(restoreUser);

// ============== DELETE ==============


// ============== GET ==============

const getGroupById = require('./get_group_by_id.js');
router.use('/:id', getGroupById);

const getAllGroups = require('./get_all_groups.js');
router.use('/', getAllGroups);



// ============== POST ==============

const postNewImageToGroup = require('./post_new_image_to_group');
router.use('/:id/images', postNewImageToGroup);

const postNewGroup = require('./post_new_group.js');
router.use('/', postNewGroup);

// ============== PUT ==============

module.exports = router;
