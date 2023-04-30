
interface IAppointment {
    _id: string,
    title: string;
    description: string;
    tags: string[];
    reference: string;
    notes?: string;
    status?: string;
    patientId?: string;
    doctorId?: string;
    appointmentDate?: Date;
    duration: number;
    invoiceId?: string;
}


export default IAppointment
