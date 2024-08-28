const Attendance = require('../models/attendance'); // Import the Attendance model
const User = require('../models/user'); // Import the User model

const attendanceController = {
    // Create a new attendance record
    createAttendance: async (request, response) => {
        try {
            const { userId, status, checkInTime, checkOutTime, remarks, role, updatedBy } = request.body;

            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // Create a new attendance record
            const newAttendance = new Attendance({
                employee: userId,
                date: new Date(),
                status,
                checkInTime,
                checkOutTime,
                remarks,
                role,
                updatedBy
            });

            // Save the attendance record
            const savedAttendance = await newAttendance.save();

            // Return a success message with the saved attendance record
            response.status(201).json({
                message: 'Attendance marked successfully',
                attendance: savedAttendance
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get all attendance records
    getAllAttendanceRecords: async (request, response) => {
        try {
            // Fetch all attendance records from the database
            const attendanceRecords = await Attendance.find().populate('employee', 'name location').populate('updatedBy', 'name');
            response.status(200).json({ attendanceRecords });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get attendance records by user ID
    getAttendanceByUserId: async (request, response) => {
        try {
            const userId = request.params.userId;

            // Fetch the attendance records by user ID
            const attendanceRecords = await Attendance.find({ employee: userId }).populate('employee', 'name location').populate('updatedBy', 'name');

            if (!attendanceRecords.length) {
                return response.status(404).json({ message: 'No attendance records found for this user' });
            }

            response.status(200).json({ attendanceRecords });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Update attendance record by ID
    updateAttendanceById: async (request, response) => {
        try {
            const attendanceId = request.params.id;
            const { status, checkInTime, checkOutTime, remarks, updatedBy } = request.body;

            // Fetch the attendance record by ID
            const attendanceRecord = await Attendance.findById(attendanceId);

            // If attendance record is not found, return an error message
            if (!attendanceRecord) {
                return response.status(404).json({ message: 'Attendance record not found' });
            }

            // Update the attendance details
            if (status) attendanceRecord.status = status;
            if (checkInTime) attendanceRecord.checkInTime = checkInTime;
            if (checkOutTime) attendanceRecord.checkOutTime = checkOutTime;
            if (remarks) attendanceRecord.remarks = remarks;
            if (updatedBy) attendanceRecord.updatedBy = updatedBy;

            // Save the updated attendance record
            const updatedAttendance = await attendanceRecord.save();

            response.status(200).json({
                message: 'Attendance updated successfully',
                attendance: updatedAttendance
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Delete attendance record by ID
    deleteAttendanceById: async (request, response) => {
        try {
            const attendanceId = request.params.id;

            // Delete the attendance record from the database
            const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);

            // If attendance record is not found, return an error message
            if (!deletedAttendance) {
                return response.status(404).json({ message: 'Attendance record not found' });
            }

            response.status(200).json({ message: 'Attendance record deleted successfully' });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = attendanceController;