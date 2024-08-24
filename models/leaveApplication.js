const mongoose = require('mongoose');

const LeaveApplicationSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Unpaid Leave'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin' 
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        required: true
    },
    remarks: {
        type: String
    }
});

module.exports = mongoose.model('LeaveApplication', LeaveApplicationSchema);
