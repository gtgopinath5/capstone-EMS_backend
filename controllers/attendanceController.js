// Import the Attendance model
const Attendance = require("../models/attendance");
// Import the User model
const User = require('../models/user');

// Define the Attendance controller
const attendanceController = {
  // Mark attendance for a user
  markAttendance: async (req, res) => {
    try {
      const { employeeId, status, checkInTime, checkOutTime, remarks, role } = req.body;

      // Check if the user exists
      const user = await User.findById(employeeId);
      if (!user) {
        console.error(`User with ID ${employeeId} not found`);
        return res.status(404).json({ message: "User not found" });
      }

      // Create a new attendance record
      const newAttendance = new Attendance({
        employee: employeeId,
        date: new Date(),
        status,
        checkInTime,
        checkOutTime,
        remarks,
        role,
      });

      // Save the attendance record
      const savedAttendance = await newAttendance.save();

      // Return a success message with the saved attendance record
      res.status(201).json({
        message: "Attendance marked successfully",
        attendance: savedAttendance,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get all attendance records
  getAllAttendanceRecords: async (req, res) => {
    try {
      // Fetch all attendance records from the database
      const attendanceRecords = await Attendance.find().populate("employee", "name location");
      res.status(200).json({ attendanceRecords });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get attendance records by user ID
  getAttendanceByuserId: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Fetch the attendance records by user ID
      const attendanceRecords = await Attendance.find({ employee: userId }).populate("employee", "name location");

      if (!attendanceRecords.length) {
        return res.status(400).json({ message: "No attendance records found for this user" });
      }

      res.status(200).json({ attendanceRecords });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update attendance record by ID
  updateAttendanceById: async (req, res) => {
    try {
      const attendanceId = req.params.id;
      const { status, checkInTime, checkOutTime, remarks } = req.body;

      // Fetch the attendance record by ID
      const attendanceRecord = await Attendance.findById(attendanceId);

      // If attendance record is not found, return an error message
      if (!attendanceRecord) {
        return res.status(400).json({ message: "Attendance record not found" });
      }

      // Update the attendance details
      if (status) attendanceRecord.status = status;
      if (checkInTime) attendanceRecord.checkInTime = checkInTime;
      if (checkOutTime) attendanceRecord.checkOutTime = checkOutTime;
      if (remarks) attendanceRecord.remarks = remarks;

      // Save the updated attendance record
      const updatedAttendance = await attendanceRecord.save();

      res.status(200).json({
        message: "Attendance updated successfully",
        attendance: updatedAttendance,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete attendance record by ID
  deleteAttendanceById: async (req, res) => {
    try {
      const attendanceId = req.params.id;

      // Delete the attendance record from the database
      const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);

      // If attendance record is not found, return an error message
      if (!deletedAttendance) {
        return res.status(400).json({ message: "Attendance record not found" });
      }

      res.status(200).json({ message: "Attendance record deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

// Export the controller
module.exports = attendanceController;
