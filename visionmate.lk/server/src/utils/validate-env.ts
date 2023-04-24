import { cleanEnv } from "envalid";
import { port, str, email, url } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    PORT: port(),
    API: url(),
    API_URL: url(),
    CLIENT_URL: url(),
    MONGOOSE_URI: str(),
    TEST_MONGOOSE_URI: str(),
    JWT_SECRET: str(),
    TIMEZONE: str(),
    FILE_ACCESS_URL: str(),
    DEFAULT_FILE: str(),
    UPLOAD_PATH: str(),
    EMAIL_ATTACHMENT_URL: email(),
});
