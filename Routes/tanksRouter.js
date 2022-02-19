const router = require('express').Router()
const tankCtrl = require('../Controllers/tanksCtrl')
const auth = require('../Middleware/auth')
const authAdmin = require('../Middleware/authAdmin')


router.route('/tanks')
    .get(tankCtrl.getTanks)
    .post(auth, authAdmin, tankCtrl.createTank)


router.route('/tanks/:id')
    .delete(auth, authAdmin, tankCtrl.deleteTank)
    .put(auth, authAdmin, tankCtrl.updateTank)


module.exports = router