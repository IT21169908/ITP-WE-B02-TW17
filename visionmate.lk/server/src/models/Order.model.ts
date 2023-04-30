import * as mongoose from "mongoose";
import {StringOrObjectId} from "../types/util-types";

interface CommonAttributes {
    userId: StringOrObjectId;
    spectacleId: StringOrObjectId;
    address: string;
    phone: string;
    email?: string;
    paymentMethod: "cod" | "online";
    totalAmount: number;
    shippingFee: number;
    note?: string;
}

export interface DOrder extends CommonAttributes {
    _id?: StringOrObjectId;
    status: "pending" | "processing" | "shipped" | "delivered";
}

export interface IOrder extends CommonAttributes, mongoose.Document {
    status: "pending" | "processing" | "shipped" | "delivered";
}