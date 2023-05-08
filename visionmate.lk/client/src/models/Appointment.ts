
interface IAppointment {
    _id: string,
    title: string;
    description: string;
    tags: string;
    reference: string;
    notes: string;
    status: string;
    patientId: string;
    doctorId: string;
    appointmentDate: string;
    duration: string;
    invoiceId: string;

    [key: string]: string | number
}


export default IAppointment
