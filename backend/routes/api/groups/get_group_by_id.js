const router = require('express').Router();
const { Group, GroupImage, User, Membership, Venue } = require('../../../db/models');
const { formatGroupTotal } = require('../../../utils/formatGroupTotal');

router.get('/:groupId', async (req, res, next) => {

  const { groupId } = req.params;

  const group = await Group.unscoped().findOne({
    where: { id: groupId },
    include: [
      { model: GroupImage, attributes: ["id", "url", "preview"] },
      { model: Membership },
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Venue },
    ]
  });

  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  const groupInfo = await formatGroupTotal(group)

  return res.status(200).json(groupInfo);

});

module.exports = router;
