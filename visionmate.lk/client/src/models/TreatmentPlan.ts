
interface ITreatmentPlan {
    _id: string;
    title: string;
    description: string;
    treatmentPlan: string; // The recommended treatment plan for the patient's condition.
    startDate: string;
    endDate: string;
    patientId: string;
    doctorId: string;
    diagnosis: string;
    medications: string; // Any medications that have been prescribed for the patient.
    procedures: string;
    instructions: string;
    referral: string; // If the patient needs to be referred to a specialist, this field would indicate the name of the specialist and any other relevant information.
    progressNotes: string; // Any notes on the patient's progress or changes to the treatment plan.

    [key: string]: string | number
}

export default ITreatmentPlan
