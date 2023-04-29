import { Express } from 'express';
import * as AppointmentEp from "../end-points/Appointment.ep";

export function AppointmentRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */
    app.get('/api/surgeon/appointment/get-all', AppointmentEp.getAll);
    app.get('/api/surgeon/appointment/getById/:_id', AppointmentEp.fetchAppointmentValidationRules(), AppointmentEp.getById);

    /* AUTH ROUTES (Admin) ===================================== */
    app.post('/api/surgeon/appointment/add', AppointmentEp.createAppointmentValidationRules(), AppointmentEp.create);
    app.post('/api/surgeon/appointment/update', AppointmentEp.updateAppointmentValidationRules(), AppointmentEp.update);
    app.delete('/api/surgeon/appointment/delete/:_id', AppointmentEp.fetchAppointmentValidationRules(), AppointmentEp.deleteAppointment);
}
