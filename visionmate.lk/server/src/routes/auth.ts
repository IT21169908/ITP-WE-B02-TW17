import { Express } from 'express';
import * as UserEp from "../end-points/User.ep";

export function AuthRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */
    app.post('/api/public/login', UserEp.authenticateValidationRules(), UserEp.loginUser);
    app.post('/api/public/register', UserEp.registerValidationRules(), UserEp.registerUser);
    // app.post('/api/public/forgot-password', PasswordResetEp.forgotPasswordValidationRules(), PasswordResetEp.forgotPassword);
    // app.post('/api/public/reset-password', PasswordResetEp.resetPasswordValidationRules(), PasswordResetEp.resetPassword);

    // app.get('/api/public/token-validate/:token', PasswordResetEp.tokenValidationRules(), PasswordResetEp.tokenValidate);
    // app.get('/api/public/logout', UserEp.logout);

    /* AUTH ROUTES ===================================== */
    app.get('/api/auth/me', UserEp.getSelf);
    // app.post('/api/auth/user/update', UserEp.updateValidationRules(), UserEp.updateUser);

}
