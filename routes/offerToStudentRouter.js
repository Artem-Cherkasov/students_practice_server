const Router = require('express');
const router = new Router();
const offerToStudentController = require('../controllers/offerToStudentController');

router.get('/check', offerToStudentController.check);
router.get('/', offerToStudentController.getAll);
router.get('/getAllByStudentID/:id_student', offerToStudentController.getAllByStudentID);
router.get('/getAcceptedByStudentID/:id_student', offerToStudentController.getAcceptedByStudentID);
router.get('/:id_company_chose_student', offerToStudentController.getOne);
router.post('/offer', offerToStudentController.createNew);
router.put('/accept/:id_company_chose_student', offerToStudentController.update);

module.exports = router;