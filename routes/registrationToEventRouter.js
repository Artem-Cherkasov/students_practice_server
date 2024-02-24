const Router = require('express');
const router = new Router();
const registrationToEventController = require('../controllers/registrationToEventController');

router.get('/check', registrationToEventController.check);
router.get('/trainingTypesByCompany/:id_company', registrationToEventController.getAllWithId);
router.get('/', registrationToEventController.getAll);
router.get('/:id_training_type', registrationToEventController.getOne);
router.get('/getOneTrainingType/:id_training_type', registrationToEventController.getOneTrainingType);
router.post('/register', registrationToEventController.createNew);
router.put('/addStudent/:id_training_type', registrationToEventController.update);

module.exports = router;