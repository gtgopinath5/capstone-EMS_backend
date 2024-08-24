// Import the LeaveApplication model
const LeaveApplication = require("../models/leaveApplication");
const User = require("../models/user");

// Define the LeaveApplication controller
const leaveApplicationController = {
  // Create a new leave application
  createLeaveApplication: async (request, response) => {
    try {
      const { userId, leaveType, startDate, endDate, reason, role } = request.body;

      // Check if the user exists
      const user = await User.findById(userId); // Corrected 'user' to 'User'
      if (!user) {
        return response.status(400).json({ message: "User not found" });
      }

      // Create a new leave application
      const newLeaveApplication = new LeaveApplication({
        employee: userId,
        leaveType,
        startDate,
        endDate,
        reason,
        status: "Pending", // Default status
        role, // Ensure this field is included if it's required
      });

      // Save the leave application
      const savedLeaveApplication = await newLeaveApplication.save();

      // Return a success message with the saved leave application
      response.status(201).json({
        message: "Leave application created successfully",
        leaveApplication: savedLeaveApplication,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Get all leave applications
  getAllLeaveApplications: async (request, response) => {
    try {
      // Fetch all leave applications from the database
      const leaveApplications = await LeaveApplication.find().populate("employee", "name location");
      response.status(200).json({ leaveApplications });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Get a leave application by ID
  getLeaveApplicationById: async (request, response) => {
    try {
      const leaveApplicationId = request.params.id;

      // Fetch the leave application by ID
      const leaveApplication = await LeaveApplication.findById(leaveApplicationId).populate("employee", "name location");

      // If leave application is not found, return an error message
      if (!leaveApplication) {
        return response.status(400).json({ message: "Leave application not found" });
      }

      response.status(200).json({ leaveApplication });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Update the status of a leave application (e.g., approve/reject)
  updateLeaveApplicationStatus: async (request, response) => {
    try {
      const leaveApplicationId = request.params.id;
      const { status, remarks } = request.body;

      // Fetch the leave application by ID
      const leaveApplication = await LeaveApplication.findById(leaveApplicationId);

      // If leave application is not found, return an error message
      if (!leaveApplication) {
        return response.status(400).json({ message: "Leave application not found" });
      }

      // Update the status and remarks of the leave application
      if (status) leaveApplication.status = status;
      if (remarks) leaveApplication.remarks = remarks;

      // Save the updated leave application
      const updatedLeaveApplication = await leaveApplication.save();

      response.status(200).json({
        message: "Leave application status updated successfully",
        leaveApplication: updatedLeaveApplication,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Delete a leave application by ID
  deleteLeaveApplication: async (request, response) => {
    try {
        const leaveApplicationId = request.params.id;

        // Delete the leave application from the database
        const deletedLeaveApplication = await LeaveApplication.findByIdAndDelete(leaveApplicationId);

        // If leave application is not found, return an error message
        if (!deletedLeaveApplication) {
            return response.status(400).json({ message: "Leave application not found" });
        }

        response.status(200).json({ message: "Leave application deleted successfully" });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
},

};

// Export the controller
module.exports = leaveApplicationController;
