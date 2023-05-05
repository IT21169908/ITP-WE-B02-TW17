
interface IAppointmentTransaction {
    _id: string;
    appointmentId: string;
    type: string;
    amount: number;
    currency?: string;
    paymentMethod?: string;
    notes?: string;
    transactionType?: string;
    transactionDate?: string;
    transactionStatus?: string;
    accountId?: string;
}


export default IAppointmentTransaction;
