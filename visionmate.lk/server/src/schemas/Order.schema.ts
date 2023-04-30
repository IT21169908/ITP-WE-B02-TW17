import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {IOrder} from "../models/Order.model";

const schemaOptions: mongoose.SchemaOptions = {
    _id: true,
    id: false,
    timestamps: true,
    skipVersioning: {
        updatedAt: true
    },
    strict: true,
    toJSON: {
        getters: true,
        virtuals: true,
    },
};

export const OrderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.String,
        required: true,
    },
    spectacleId: {
        type: Schema.Types.String,
        required: true,
    },
    status: {
        type: Schema.Types.String,
        enum: ["pending", "processing", "shipped", "delivered"],
        required: true,
    },
    address: {
        type: Schema.Types.String,
        required: true,
    },
    phone: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    paymentMethod: {
        type: Schema.Types.String,
        enum: ["cod", "online"],
        required: false,
    },
    shippingFee: {
        type: Schema.Types.Number,
        required: true,
    },
    totalAmount: {
        type: Schema.Types.Number,
        required: true,
    },
    note: {
        type: Schema.Types.String,
        required: false,
    },

}, schemaOptions);

const Order = mongoose.model<IOrder>("orders", OrderSchema);

export default Order;