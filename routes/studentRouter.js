const Router = require('express');
const router = new Router();
const studentController = require('../controllers/studentController');

// router.post('/apply', studentController.apply);
router.get('/check', studentController.check);
router.get('/getExcel/:id_event', studentController.getExcelFile);
router.get('/:full_name', studentController.getSearchResult);
router.get('/profile/:id_student', studentController.getOne);
router.get('/', studentController.getAll);
router.post('/', studentController.createNew);
router.post('/:id_student', studentController.deleteAny);
router.post('/:id_student', studentController.deleteOne);
router.put('/profile/:id_student', studentController.update);

module.exports = router;