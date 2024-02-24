const Router = require('express');
const router = new Router();
const adminController = require('../controllers/adminController');

router.get('/check', adminController.check);
router.get('/', adminController.getAll);
router.get('/:id_admin', adminController.getOne);
// router.post('/createUser', userController.createNew);
// router.post('/createUsers', userController.addAny);

module.exports = router;