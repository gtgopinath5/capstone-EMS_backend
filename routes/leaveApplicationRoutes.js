const express = require('express');
const leaveApplicationController = require('../controllers/leaveApplicationController');
const auth = require('../middlewares/auth');

const leaveApplicationRouter = express.Router();

leaveApplicationRouter.post('/', auth.isAuth, leaveApplicationController.createLeaveApplication);
leaveApplicationRouter.get('/', auth.isAuth, auth.isAdmin, leaveApplicationController.getAllLeaveApplications);
leaveApplicationRouter.get('/:id', auth.isAuth, leaveApplicationController.getLeaveApplicationById);
leaveApplicationRouter.put('/:id', auth.isAuth, auth.isAdmin, leaveApplicationController.updateLeaveApplicationStatus);
leaveApplicationRouter.delete('/:id', auth.isAuth, auth.isAdmin, leaveApplicationController.deleteLeaveApplication);

module.exports = leaveApplicationRouter;
