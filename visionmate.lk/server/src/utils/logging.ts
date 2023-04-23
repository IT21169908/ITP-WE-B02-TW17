const moment = require('moment-timezone');
const winston = require('winston');
const SESSION = Symbol.for('session');
const timezone = process.env.TIMEZONE;

const appendTimestamp = winston.format((info: any, opts: any) => {
    if (opts.tz) {
        info.timestamp = moment().tz(opts.tz).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
    }
    return info;
});

// TODO use a package like express-http-context to get session info.
const sessionData = winston.format(function (info: any) {
    info[SESSION] = {user_id: 0, progress_id: 0};
    return info;
});

// RequestLogger ================
const requestFormat = winston.format.printf((info: any) => {
    return `${info.timestamp} ${info.message}`;
});

const requestLoggerTransporter: any[] = [
    new winston.transports.Console({level: 'info',})
];

requestLoggerTransporter.push(
    new winston.transports.File({
        level: 'info',
        filename: 'log/request.log',
    })
);

export const RequestLogger = winston.createLogger({
    format: winston.format.combine(
        appendTimestamp({tz: timezone}),
        requestFormat
    ),
    label: 'request',
    transports: requestLoggerTransporter
});

// AppLogger ================
const appFormat = winston.format.printf((info: any) => {
    return `${info.timestamp} [${info[SESSION].user_id}] [${info[SESSION].progress_id}] ${info.level}: ${info.message}`;
});

const appLoggerTransporter: any[] = [
    new winston.transports.Console({level: 'info', label: 'app'})
];

appLoggerTransporter.push(
    new winston.transports.File({
        filename: 'log/app.log',
        level: 'info',
        label: 'app'
    })
);

export const AppLogger = winston.createLogger({
    format: winston.format.combine(
        appendTimestamp({tz: timezone}),
        sessionData(),
        appFormat,
    ),
    transports: appLoggerTransporter
});

// ErrorLogger ================
const errorFormat = winston.format.printf((info: any) => {
    return `${info.timestamp} [${info[SESSION].user_id}] [${info[SESSION].progress_id}] ${info.level}: ${info.message} \n\n`;
});

const errorLoggerTransporter: any[] = [
    new winston.transports.Console({level: 'info', label: 'error'})
];

errorLoggerTransporter.push(
    new winston.transports.File({
        filename: 'log/error.log',
        level: 'info',
        label: 'error'
    })
);

export const ErrorLogger = winston.createLogger({
    format: winston.format.combine(
        appendTimestamp({tz: timezone}),
        sessionData(),
        errorFormat,
    ),
    transports: errorLoggerTransporter
});

// UaLogger ================
const uaFormat = winston.format.printf((info: any) => {
    return `${info.timestamp} [${info[SESSION].user_id}] [${info[SESSION].progress_id}] ${info.message}`;
});

const uaLoggerTransporter: any[] = [
    new winston.transports.Console({level: 'info', label: 'ua'})
];

uaLoggerTransporter.push(
    new winston.transports.File({
        filename: 'log/ua.log',
        level: 'info',
        label: 'ua'
    })
);
export const UaLogger = winston.createLogger({
    format: winston.format.combine(
        appendTimestamp({tz: timezone}),
        sessionData(),
        uaFormat,
    ),
    transports: uaLoggerTransporter
});
