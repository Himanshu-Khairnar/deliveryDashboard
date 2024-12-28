
import mongoose, { models } from "mongoose";
const AssignmentMetricsSchema = new mongoose.Schema({
    totalAssigned: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    averageTime: { type: Number, default: 0 },
    failureReasons: [{
        reason: { type: String },
        count: { type: Number, default: 0 }
    }]
}, { timestamps: true });


export const AssignmentMetrics = models.AssignmentMetrics || mongoose.model('AssignmentMetrics', AssignmentMetricsSchema)
