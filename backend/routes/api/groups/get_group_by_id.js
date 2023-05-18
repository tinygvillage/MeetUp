const router = require('express').Router();
const { Group, GroupImage, User, Membership, Venue } = require('../../../db/models');
const { formatGroupTotal } = require('../../../utils/formatGroupTotal');

router.get('/:groupId', async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findOne({
      where: { id: groupId },
      include: [
        { model: GroupImage, attributes: ["id", "url", "preview"] },
        { model: Membership },
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: Venue },
      ]
    });

    if (!group) {
      return res.status(404).json({ message: "Group couldn't be found" });
    }

    const groupInfo = await formatGroupTotal(group)

    return res.status(200).json(groupInfo);
    // return res.status(200).json(group);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
