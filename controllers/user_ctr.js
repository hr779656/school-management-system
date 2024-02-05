const {body, validationResult} = require('express-validator')


let ValidSch_userReg = [
    body('name').isLength({ min: 6, max: 12 }).withMessage('Username must be 6 and 12 char'),
    body('password').isLength({ min: 8, max: 8 }).withMessage('Password must be 8 char required')
];


const createuser = (req, res)=>{
 console.log(req.body)
 res.json(req.body)
}


module.exports = {createuser}