import {NextFunction, Request, Response} from "express";
import {Types} from "mongoose";
import * as Order from "../dao/Order.dao";
import {validationsChecker} from "../middleware/validations/validation-handler";
import {OrderValidations} from "../middleware/validations/order-validations";
import {DOrder} from "../models/Order.model";
import {IUser} from "../models/User.model";


// ================ VALIDATIONS ================
export function createOrderValidationRules() {
    return [
        OrderValidations.userId(),
        OrderValidations.status(),
        OrderValidations.address(),
        OrderValidations.phone(),
        OrderValidations.email(),
        OrderValidations.paymentMethod(),
        OrderValidations.totalAmount(),
        OrderValidations.shippingFee(),
        OrderValidations.note(),
    ];
}

export function updateOrderValidationRules() {
    return [OrderValidations.orderId()];
}

export function fetchOrderValidationRules() {
    return [OrderValidations.orderId()];
}

// ================ CREATE - C ================
export async function create(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;

        const data: DOrder = {
            userId: user._id,
            status: "pending",
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            paymentMethod: "cod",
            totalAmount: req.body.totalAmount,
            shippingFee: req.body.shippingFee,
            note: req.body.note,
        };
        await Order.placeOrder(data, user).then(order => {
            res.sendSuccess(order, "Order created successfully!");
        }).catch(next);
    }
}

// ================ READ - R ================
export async function getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await Order.getAllOrders(user).then(order => {
        res.sendSuccess(order, "Get all order successfully!");
    }).catch(next);
}

export async function getByUser(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await Order.findByUser(user).then(order => {
        res.sendSuccess(order, "Get all order successfully!");
    }).catch(next);
}

export function show(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const orderId = req.params._id as unknown as Types.ObjectId;
        Order.findOrder(orderId, user).then(order => {
            res.sendSuccess(order, "Get order by ID successfully!");
        }).catch(next);
    }
}

// ================ UPDATE - U ================
export async function update(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const order_id = req.params._id as unknown as Types.ObjectId;
        const data: Partial<DOrder> = {
            status: req.body.status,
        };
        await Order.updateOrder(order_id, data, user).then(order => {
            res.sendSuccess(order, "Order updated successfully!");
        }).catch(next);
    }
}

// ================ DELETE - D ================
export function destroy(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const order_id = req.params._id as unknown as Types.ObjectId;
        const user = req.user as IUser;
        Order.cancelOrder(order_id, user).then(order => {
            res.sendSuccess(order, "Order updated successfully!");
        }).catch(next);
    }
}
