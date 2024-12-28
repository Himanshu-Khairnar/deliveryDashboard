import mongoose, { models } from "mongoose";

const AssignmentSchema = new mongoose.Schema({

    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner', required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['success', 'failed'], required: true },
    reason: { type: String }
});


export const Assignment=models.Assignment || mongoose.model('Assignment', AssignmentSchema)
