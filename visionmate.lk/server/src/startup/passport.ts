import * as express from 'express';
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import User from "../schemas/User.schema";
import env from "../utils/validate-env";
import passport from "passport";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_SECRET,
    //issuer: 'admin.visionmate.lk',
    //audience: 'visionmate.lk',
}

export default async function passportStartup(app: express.Application) {
    await app.use(passport.initialize());
    await app.use(passport.session());

    await passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await User.findById(jwt_payload.user_id).exec();
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }));

    // await passport.use(new JWTStrategy(opts, (jwtPayload: any, callback: any) => {
    //     return User.findById(jwtPayload.user_id).then(user => {
    //         return callback(null, user);
    //     }).catch(ex => {
    //         return callback(ex);
    //     });
    // }));

    // await passport.use(new LocalStrategy({
    //     usernameField: 'email',
    //     passwordField: 'password'
    // }, (username: string, password: string, callback: any) => {
    //     return User.findOne({email: username}).then(user => {
    //         if (!user) {
    //             return callback(null, {message: 'Incorrect username/password combination'});
    //         }
    //     }).catch(ex => {
    //         ErrorLogger.error(ex);
    //         return callback(ex);
    //     });
    // }));
}
