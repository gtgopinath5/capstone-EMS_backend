const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middlewares/auth');

const attendanceRouter = express.Router();

// User routes
attendanceRouter.post('/attendance', auth.isAuth, attendanceController.createAttendance); // Create a new attendance record
attendanceRouter.get('/attendance/user/:userId', auth.isAuth, attendanceController.getAttendanceByUserId); // Get attendance records by user ID

// Admin routes
attendanceRouter.get('/attendance', auth.isAuth, auth.isAdmin, attendanceController.getAllAttendanceRecords); // Get all attendance records
attendanceRouter.put('/attendance/:id', auth.isAuth, auth.isAdmin, attendanceController.updateAttendanceById); // Update attendance record by ID
attendanceRouter.delete('/attendance/:id', auth.isAuth, auth.isAdmin, attendanceController.deleteAttendanceById); // Delete attendance record by ID

// Export the router
module.exports = attendanceRouter;