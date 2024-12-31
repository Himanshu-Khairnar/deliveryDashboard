import {Schema,model,models} from "mongoose";

const DeliveryPartnerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    currentLoad: { type: Number, default: 0, max: 3 },
    areas: { type: [String], required: true },
    shift: {
        start: { type: String, required: true }, // HH:mm
        end: { type: String, required: true }   // HH:mm
    },
    metrics: {
        rating: { type: Number, default: 0 },
        completedOrders: { type: Number, default: 0 },
        cancelledOrders: { type: Number, default: 0 }
    }
}, { timestamps: true });



export const DeliveryPartner = models.DeliveryPartner || model('DeliveryPartner', DeliveryPartnerSchema);
