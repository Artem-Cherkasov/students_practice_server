const Router = require('express');
const router = new Router();
const companyController = require('../controllers/companyController');

router.get('/check', companyController.check);
router.get('/:name', companyController.getSearchResult);
router.get('/profile/:id_company', companyController.getOne);
router.get('/', companyController.getAll);
router.post('/', companyController.createNew);
router.post('/:id_company', companyController.deleteAny);
router.post('/:id_company', companyController.deleteOne);
router.put('/profile/:id_company', companyController.update);

module.exports = router;