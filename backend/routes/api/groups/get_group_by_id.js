const router = require('express').Router();
const { requireAuth } = require('../../../utils/auth');
const { Group } = require('../../../db/models')
// use requireAuth to make sure they're logged in

router.get('/:groupId', async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const group = await Group.findByPk(groupId);

      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }

      return res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
