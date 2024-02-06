const { validationResult } = require('express-validator');
const prisma = require('../DB/dbConfig');
require('dotenv').config();

const createuser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }

    let { name, password, role, secretkey } = req.body;

    name = name.trim().toLowerCase();
    password = password.trim().toLowerCase();

    if (role === 'ADMIN' && secretkey === process.env.SECRETKEY || role === 'USER') {
        try {
             await prisma.users.create({
                data: {
                    name,
                    password,
                    role,
                },
            });
            res.json({ msg: 'User successfully registered' });
        } catch (err) {
            res.json({ msg: err.message });
        }
    } else {
        res.status(403).json({ msg: 'Unauthorized' });
    }
};

module.exports = { createuser };
