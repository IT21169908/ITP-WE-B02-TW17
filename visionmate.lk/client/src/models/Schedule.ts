interface Schedule {
    _id: string;
    schedule: string;
    surgeonId: string;
    patientId: string;
    scheduleDate: string;
    remark: string;
    status?: string;
}

export default Schedule
