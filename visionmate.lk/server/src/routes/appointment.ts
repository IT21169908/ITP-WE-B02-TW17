import { Express } from 'express';
import * as AppointmentEp from "../end-points/Appointment.ep";
import * as AppointmentTransactionEp from "../end-points/AppointmentTransaction.ep";

export function AppointmentRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */

    /* AUTH ROUTES (Surgeon) ===================================== */
    app.get('/api/auth/appointment/get-all', AppointmentEp.getAll);

    /* AUTH ROUTES (Surgeon | Patient) ===================================== */
    app.get('/api/auth/appointment/getById/:_id', AppointmentEp.fetchAppointmentValidationRules(), AppointmentEp.getById);

    /* AUTH ROUTES (Patient) ===================================== */
    app.post('/api/patient/appointment/add', AppointmentEp.createAppointmentValidationRules(), AppointmentEp.create);
    app.put('/api/patient/appointment/update', AppointmentEp.updateAppointmentValidationRules(), AppointmentEp.update);
    app.delete('/api/patient/appointment/delete/:_id', AppointmentEp.fetchAppointmentValidationRules(), AppointmentEp.deleteAppointment);

    /* AUTH ROUTES (Auth) ===================================== */
    app.get('/api/auth/transaction/get-all', AppointmentTransactionEp.getAll);
    app.get('/api/auth/transaction/getById/:_id', AppointmentTransactionEp.fetchAppointmentTransactionValidationRules(), AppointmentTransactionEp.getById);

    app.post('/api/auth/transaction/add', AppointmentTransactionEp.createAppointmentTransactionValidationRules(), AppointmentTransactionEp.create);
    app.put('/api/auth/transaction/update', AppointmentTransactionEp.updateAppointmentTransactionValidationRules(), AppointmentTransactionEp.update);
    app.delete('/api/auth/transaction/delete/:_id', AppointmentTransactionEp.fetchAppointmentTransactionValidationRules(), AppointmentTransactionEp.deleteTransaction);

}
