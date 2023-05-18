const router = require('express').Router();
const { Group, GroupImage, User, Membership, Venue } = require('../../../db/models');
const { formatGroupTotal } = require('../../../utils/formatGroupTotal');

router.get('/:groupId', async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findOne({
      where: { id: groupId },
      include: [{ model: GroupImage }, { model: Membership }, { model: Venue }, { model: User }]
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const groupInfo = formatGroupTotal(group)

    return res.status(200).json(groupInfo);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
