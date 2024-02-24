const Router = require('express');
const router = new Router();
const documentUploadController = require('../controllers/documentUploadController');

// router.post('/apply', studentController.apply);
router.post('/upload', documentUploadController.createFile);
router.get('/:id_student', documentUploadController.getFiles);
router.post('/:id_document_upload', documentUploadController.deleteAny);
router.post('/:id_document_upload', documentUploadController.deleteOne);

module.exports = router;