import * as express from 'express';
// import * as passport from 'passport';
import {ExtractJwt} from "passport-jwt";
import User from "../schemas/User.schema";
import env from "../util/validate-env";
// import {ErrorLogger} from "../common/logging";

const passport = require('passport');
const passportJWT = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

export default async function passportStartup(app: express.Application) {
    app.use(passport.initialize());
    app.use(passport.session());

    // passport.use(new LocalStrategy({
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

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env.JWT_SECRET
    }, (jwtPayload: any, callback: any) => {
        return User.findById(jwtPayload.user_id).then(user => {
            return callback(null, user);
        }).catch(ex => {
            return callback(ex);
        });
    }));
}
