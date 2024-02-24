const Router = require('express');
const router = new Router();
const departmentController = require('../controllers/departmentController');

router.get('/check', departmentController.check);
router.get('/', departmentController.getAll);
router.get('/:id_department', departmentController.getOne);
router.post('/', departmentController.createNew);
router.post('/:id_department', departmentController.deleteAny);
router.post('/:id_department', departmentController.deleteOne);
router.put('/:id_department', departmentController.update);

module.exports = router;