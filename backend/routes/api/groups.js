const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

const { check } = require('express-validator');
const { authorizedUser, validateGroupCreation } = require('../../utils/validation');

const { Group, User } = require('../../db/models');

// need requirAuth to verify user IS logged in
router.post('/', requireAuth, validateGroupCreation, async (req, res, next) => {
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

router.get('', async (req, res, next) => {

    const Groups = await Group.unscoped().findAll();
    

    if (!Groups) next(err);

    res.status(200).json({ Groups })
})

module.exports = router;
