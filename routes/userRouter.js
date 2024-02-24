const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.get('/check', userController.check);
router.get('/', userController.getAll);
router.post('/checkUser', userController.checkUser);
router.get('/:id_user', userController.getOne);
router.post('/createUser', userController.createNew);
router.post('/createUsers', userController.addAny);

module.exports = router;