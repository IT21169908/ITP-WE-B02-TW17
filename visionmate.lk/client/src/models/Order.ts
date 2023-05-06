import Spectacle from "./Spectacle";

interface IOrder {
    _id: string;
    userId: string;
    spectacleId?: Spectacle;
    address: string;
    phone: string;
    email: string;
    paymentMethod: "cod" | "online";
    totalAmount: number;
    shippingFee: number;
    note?: string;
    status: "pending" | "processing" | "shipped" | "delivered";
}


export default IOrder