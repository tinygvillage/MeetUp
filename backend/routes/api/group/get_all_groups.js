const router = require('express').Router();
const { Group } = require('../../../db/models');

router.get('', async (req, res, next) => {

    const Groups = await Group.unscoped().findAll();

    if (!Groups) next(err);

    res.status(200).json({ Groups })
})


module.exports = router
