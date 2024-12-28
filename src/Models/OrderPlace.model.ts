import mongoose, { models } from "mongoose";

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    area: { type: String, required: true },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    status: { type: String, enum: ['pending', 'assigned', 'picked', 'delivered'], default: 'pending' },
    scheduledFor: { type: String, required: true }, // HH:mm
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
export const Order=models.Order || mongoose.model('Order', OrderSchema)
