const Router = require('express');
const router = new Router();
const employeeController = require('../controllers/employeeController');

// router.post('/apply', studentController.apply);
router.get('/check', employeeController.check);
router.get('/:full_name', employeeController.getSearchResult);
router.get('/profile/:id_employee', employeeController.getOne);
router.get('/', employeeController.getAll);
router.post('/', employeeController.createNew);
router.post('/:id_employee', employeeController.deleteAny);
router.post('/:id_employee', employeeController.deleteOne);
router.put('/profile/:id_employee', employeeController.update);

module.exports = router;