const router = require('express').Router();
const { Group } = require('../../../db/models');

router.get('/', async (req, res, next) => {

    const groups = await Group.unscoped().findAll();

    if (!groups) next(err);

    let groupFormat = groups.map(group => {
        
    })

    res.status(200).json({ groups })
})


module.exports = router
