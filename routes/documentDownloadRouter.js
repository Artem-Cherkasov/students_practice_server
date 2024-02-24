const Router = require('express');
const router = new Router();
const documentDownloadController = require('../controllers/documentDownloadController');

// router.post('/apply', studentController.apply);
router.get('/:name', documentDownloadController.downloadFile);

module.exports = router;