const Router = require('express');
const router = new Router();
const documentController = require('../controllers/documentController');

router.get('/check', documentController.check);
router.get('/', documentController.getAll);
router.get('/:id_document', documentController.getOne);
router.post('/', documentController.createNew);
router.post('/:id_document', documentController.deleteAny);
router.post('/:id_document', documentController.deleteOne);
router.put('/:id_document', documentController.update);

module.exports = router;