const router = require('express').Router();

const { Group, Membership, GroupImage } = require('../../../db/models');
const { requireAuth } = require('../../../utils/auth');
const { formatGroup } = require('../../../utils/formatGroup');

router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

    const groups = await Group.unscoped().findAll({
        where: { organizerId: user.id },
        include: [{ model: Membership }, { model: GroupImage, attributes: ["url"] }]
    });

    if (!groups) next(err)

    const groupInfo = await formatGroup(groups);

    return res.status(200).json({ "Groups": groupInfo });
});

module.exports = router;
