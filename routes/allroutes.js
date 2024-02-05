const express = require('express')
const router = express.Router()
const {createuser} = require('../controllers/user_ctr')

router.get('/', (req, res)=>{
    res.send("wellcome!")
})
router.post('/user-register', createuser)



module.exports = router