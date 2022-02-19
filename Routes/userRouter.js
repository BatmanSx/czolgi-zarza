const router = require('express').Router()
const userCtrl = require('../Controllers/userCtrl')
const auth = require('../Middleware/auth')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth,  userCtrl.getUser)

router.get('/getuserdata', userCtrl.getUserdata)


module.exports = router