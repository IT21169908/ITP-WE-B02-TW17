import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import app from "./app";
import { Server } from "./global";
import { AppLogger } from "./utils/logging";
import databaseSetup from "./startup/database";
import passportStartup from "./startup/passport";
import env from "./utils/validate-env";


const isProduction = process.env.NODE_ENV === "production";
const port = env.PORT;
let server: Server;

if (isProduction) {
    server = https.createServer({
        key: fs.readFileSync(process.env.SERVER_KEY_PATH || 'server.key'),
        cert: fs.readFileSync(process.env.SERVER_CERT_PATH || 'server.cert')
    }, app);
} else {
    server = new http.Server(app);
}

databaseSetup().then(() => {
    AppLogger.info('--> Mongoose connected!');
    passportStartup(app).then(() => {
        AppLogger.info('--> Passport started!');
        server.listen(port, () => {
            AppLogger.info('--> HTTPS Server successfully started at port: ' + port);
        });
    }).catch(console.error);
}).catch(console.error);

export default app;
