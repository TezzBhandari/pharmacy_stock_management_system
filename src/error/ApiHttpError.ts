import HttpStatusCodes from "../constants/HttpStatusCodes";
type SeverityLevel = "low" | "medium" | "high";

export enum ErrorType {
    CONFLICT = "CONFLICT",
    DATABASE_ERROR = "DATABASE_ERROR",
    BAD_REQUEST = "BAD REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    PASSWORD_NOT_MATCHED = "PASSWORD_NOT_MATCHED",
    INVALID_ERROR = "INVALID_ERROR",
    UNAUTHENTICATED_ERROR = "UNAUTHENTICATED_ERROR",
}

export class ApiHttpError extends Error {
    public readonly name: string = "ApiHttpError";
    public readonly severity?: SeverityLevel;
    public readonly type: ErrorType;
    public readonly statusCode: HttpStatusCodes;

    constructor({
        statusCode,
        type,
        message,
        severity,
    }: {
        statusCode: HttpStatusCodes;
        type: ErrorType;
        message: string;
        severity?: SeverityLevel;
    }) {
        super(message);

        // restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);

        this.statusCode = statusCode;
        this.type = type;
        this.message = message;
        this.severity = severity;

        Error.captureStackTrace(this);
    }
}
