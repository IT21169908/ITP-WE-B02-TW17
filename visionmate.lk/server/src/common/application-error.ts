export class ApplicationError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
