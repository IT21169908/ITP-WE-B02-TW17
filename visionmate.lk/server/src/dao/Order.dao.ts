import {Types} from "mongoose";
import {DOrder, IOrder} from "../models/Order.model";
import {IUser} from "../models/User.model";
import Order from "../schemas/Order.schema";
import {ApplicationError} from "../utils/application-error";
import {AppLogger} from "../utils/logging";
import {getRoleTitle} from "../utils/utils";
import {Role} from "../enums/auth";


export async function getAllOrders(user?: IUser): Promise<IOrder[]> {
    const orders = await Order.find().populate({
        path: "spectacleId",
        model: "spectacles",
    });
    if (orders) {
        AppLogger.info(`Got All Orders - Count: ${orders.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return orders;
    } else {
        AppLogger.info(`Orders Not Found`);
        throw new ApplicationError(`Get all orders: Orders not found!`);
    }
}


export async function findByUser(user?: IUser): Promise<IOrder[]> {
    const orders = await Order.find({'userId': user?._id}).populate({
        path: "spectacleId",
        model: "spectacles",
    });
    if (orders) {
        AppLogger.info(`Got All Orders - Count: ${orders.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return orders;
    } else {
        AppLogger.info(`Orders Not Found`);
        throw new ApplicationError(`Get all orders: Orders not found!`);
    }
}


export async function findOrder(orderId: Types.ObjectId, user?: IUser): Promise<IOrder> {
    const order = await Order.findById(orderId);
    if (order) {
        AppLogger.info(`Got Order(ID: ${order._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return order;
    } else {
        AppLogger.info(`Order(ID: ${orderId}) Not Found`);
        throw new ApplicationError(`Get Order: Order not found for ID: ${orderId} !`);
    }
}


export async function placeOrder(data: DOrder, user?: IUser): Promise<IOrder> {
    try {
        const iOrders = new Order(data);
        const order = await iOrders.save();
        AppLogger.info(`Place Order(ID: ${order._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return order;
    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Placing Order: ${error.message}`);
            throw new ApplicationError(`Placing order: ${error.message}`);
        }
        throw error;
    }
}


export async function updateOrder(orderId: Types.ObjectId, orderDetails: Partial<DOrder>, user?: IUser): Promise<IOrder> {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, orderDetails as any, {new: true});
    if (updatedOrder) {
        AppLogger.info(`Update Order(ID: ${updatedOrder._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedOrder;
    } else {
        AppLogger.info(`Order(ID: ${orderId}) Not Found`);
        throw new ApplicationError(`Update order: Order not found for ID: ${orderId} !`);
    }
}


export async function cancelOrder(orderId: Types.ObjectId, user?: IUser): Promise<IOrder> {
    const cancelledOrder = await Order.findOneAndDelete({_id: orderId});
    if (cancelledOrder) {
        AppLogger.info(`Cancelled Order(ID: ${cancelledOrder._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return cancelledOrder;
    } else {
        AppLogger.info(`Order(ID: ${orderId}) not found`);
        throw new ApplicationError(`Cancel order: Order not found for ID: ${orderId} !`);
    }
}

export async function cancelOrderByUser(orderId: Types.ObjectId, user: IUser): Promise<IOrder> {
    const cancelledOrder = await Order.findOneAndDelete({_id: orderId, userId: user._id, status: 'pending'});
    if (cancelledOrder) {
        AppLogger.info(`Cancelled Order(ID: ${cancelledOrder._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return cancelledOrder;
    } else {
        AppLogger.info(`Order(ID: ${orderId}) not found`);
        throw new ApplicationError(`Cancel order: Order not found for ID: ${orderId} !`);
    }
}
