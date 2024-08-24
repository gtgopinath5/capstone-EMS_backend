// Import the express router
const express = require('express');

// Import the attendance controller
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middlewares/auth');

// Import the express router
const attendanceRouter = express.Router();

// User routes
attendanceRouter.post('/', auth.isAuth, attendanceController.markAttendance); // Mark attendance for a user
attendanceRouter.get('/user/:userId', auth.isAuth, attendanceController.getAttendanceByuserId); // Get attendance records for a specific user

// Admin routes
attendanceRouter.get('/', auth.isAuth, auth.isAdmin, attendanceController.getAllAttendanceRecords); // Get all attendance records
attendanceRouter.put('/:id', auth.isAuth, auth.isAdmin, attendanceController.updateAttendanceById); // Update attendance record
attendanceRouter.delete('/:id', auth.isAuth, auth.isAdmin, attendanceController.deleteAttendanceById); // Delete attendance record

// Export the router
module.exports = attendanceRouter;
