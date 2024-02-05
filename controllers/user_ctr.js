const {validationResult} = require('express-validator')
const prisma = require('../DB/dbConfig')


const createuser = async (req, res)=>{
    const errors = validationResult(req)
  
    if(!errors.isEmpty()){
        return res.status(422).json(errors.array())
    }

    let {name, password, role} = req.body

    name = name.trim().toLowerCase()
    password = password.trim().toLowerCase()

    await prisma.users.create({
        name,
        password,
        role
    }).then((result)=>{
        res.json({ msg: "user successfully Register" })
    }).catch((err)=>{
        res.json({msg: err})
    })
}

module.exports = {createuser}