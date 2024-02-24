const Router = require('express');
const router = new Router();
const eventRouter = require('./eventRouter');
const studentRouter = require('./studentRouter');
const companyRouter = require('./companyRouter');
const documentRouter = require('./documentRouter');
const departmentRouter = require('./departmentRouter');
const userRouter = require('./userRouter');
const employeeRouter = require('./employeeRouter');
const documentUploadRouter = require('./documentUploadRouter');
const documentDownloadRouter = require('./documentDownloadRouter');
const offerToStudentRouter = require('./offerToStudentRouter');
const registrationToEventRouter = require('./registrationToEventRouter');
const adminRouter = require('./adminRouter');

router.use('/events', eventRouter);
router.use('/students', studentRouter);
router.use('/companies', companyRouter);
router.use('/documents', documentRouter);
router.use('/departments', departmentRouter);
router.use('/users', userRouter);
router.use('/employees', employeeRouter);
router.use('/documentUpload', documentUploadRouter);
router.use('/documentDownload', documentDownloadRouter);
router.use('/offers', offerToStudentRouter);
router.use('/trainingTypes', registrationToEventRouter);
router.use('/admins', adminRouter);

module.exports = router;