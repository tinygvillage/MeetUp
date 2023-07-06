const router = require('express').Router();
const { Group } = require('../../../db/models');

const { requireAuth } = require('../../../utils/auth');
const { validateGroup } = require('../../../utils/validation');


// need requirAuth to verify user IS logged in
router.post('/', requireAuth, validateGroup, async (req, res, next) => {
    // const { user } = req; // not necessary because requireAuth verified user already
    // const user = await authorizedUser(req, res, next);
    const { name, about, type, private, city, state } = req.body;

    const findGroup = await Group.findOne({
        where: {
            name
        }
    })

    if (findGroup) return res.status(400).json({
        message: "Group Already Exists"
    })

    else {
        const newGroup = await Group.create({
            organizerId: req.user.id,
            name,
            about,
            type,
            private,
            city,
            state
        })

        return res.status(200).json(newGroup)

    }
})

module.exports = router;
