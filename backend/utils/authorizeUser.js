const { User } = require('../db/models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');


const authorizedUser = async (req, _res, next) => {

    const { credential, password } = req.body;

    let user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    })

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials are invalid.' }
        return next(err);
    }

    return user;
}

module.exports = { authorizedUser };
