import {Express} from 'express';
import * as ScheduleEp from "../end-points/Schedule.ep";

export function ScheduleRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */
    app.get('/api/admin/schedule/get-all', ScheduleEp.getAll);
    app.get('/api/admin/schedule/getById/:_id', ScheduleEp.fetchScheduleValidationRules(), ScheduleEp.getById);

    /* AUTH ROUTES (Admin) ===================================== */
    app.post('/api/admin/schedule/add', ScheduleEp.createScheduleValidationRules(), ScheduleEp.create);
    app.put('/api/admin/schedule/update', ScheduleEp.updateScheduleValidationRules(), ScheduleEp.update);
    app.delete('/api/admin/schedule/delete/:_id', ScheduleEp.fetchScheduleValidationRules(), ScheduleEp.deleteSchedule);
}