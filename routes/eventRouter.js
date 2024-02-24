const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController');

router.post('/apply', eventController.apply);
router.get('/check', eventController.check);
router.get('/getEventsByID', eventController.getAllByID);
router.get('/', eventController.getAll);
router.get('/:id_event', eventController.getOne);
router.post('/', eventController.createNew);
router.post('/:id_event', eventController.deleteAny);
router.post('/:id_event', eventController.deleteOne);
router.put('/:id_event', eventController.update);

module.exports = router;