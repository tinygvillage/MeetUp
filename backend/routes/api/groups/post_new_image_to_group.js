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

router.post('/:id/images', requireAuth, async (req, res, next) => {
    const { id } = req.params;

    const findImage = await GroupImage.findByPk({
        where: id
    });


    if (!findImage) res.status(404).json({ message: "Image Not Found" });


    res.status(200).json({
        id: id.url
    })
});


module.exports = router;
