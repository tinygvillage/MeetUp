const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

const { check } = require('express-validator');
const { authorizedUser, handleValidationErrors, validateGroupCreation } = require('../../utils/validation');



router.post('/', [validateGroupCreation], async (req, res, next) => {
    const user = await authorizedUser(req, res, next);
    const { name, about, type, private, city, state } = req.body;

    const findGroup = await group.findOne({
        where: {
            name
        }
    })

    if (findGroup) return res.status(400).json({
        message: "Group Already Exists"
    })

    else {
        const newGroup = await Group.create({
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
