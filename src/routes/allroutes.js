const express = require('express')
const router = express.Router()
const {createuser} = require('../controllers/user_ctr')
const ValidSch_userReg = require('../middlewares/validation')

router.get('/', (req, res)=>{
    res.send("wellcome!")
})
router.post('/user-register', ValidSch_userReg, createuser)



module.exports = router