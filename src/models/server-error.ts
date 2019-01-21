export class ServerError extends Error {
    constructor(public status: number, public errorCode: string, message: string) {
        super(message);
    }
}
