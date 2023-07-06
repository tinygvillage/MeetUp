const router = require('express').Router();
const { requireAuth } = require('../../../utils/auth');
const { GroupImage, Group } = require('../../../db/models')
// use requireAuth to make sure they're logged in

// router.get('/:id/images', requireAuth, async (req, res, next) => {
//     console.log("ID", req.params.id)
//     const findGroup = await Group.findByPk({
//         where:{
//             id: req.params.id
//         }
//     });
//     if (!findGroup) res.status(404).json({ message: "Image Not Found" });
//     res.status(200).json({
//         findGroup
//     })
// })

router.post('/:groupId/images', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;

    // current user must be the organizer for the group
    // create a helper function to check status

    const findGroup = await Group.findByPk(groupId);


    if (!findGroup) res.status(404).json({ message: "Group couldn't be found" });


    res.status(200).json({
        id: groupId,
        url,
        preview
    })
});


module.exports = router;
