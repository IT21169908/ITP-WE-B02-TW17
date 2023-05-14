import Spectacle from "./Spectacle";
import User from "./User";

interface IOrder {
    _id: string;
    userId: User;
    spectacleId?: Spectacle;
    address: string;
    phone: string;
    email: string;
    paymentMethod: "cod" | "online";
    totalAmount: number;
    shippingFee: number;
    note?: string;
    status: "pending" | "processing" | "shipped" | "delivered";

    [key: string]: string | number | User | Spectacle | undefined;
}


export default IOrder