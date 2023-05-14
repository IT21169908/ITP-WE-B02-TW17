interface Schedule {
    _id: string;
    schedule: string;
    surgeonId: string;
    patientId: string;
    scheduleDate: string;
    remark: string;
    status: string;

    [key: string]: string | number
}

export default Schedule
