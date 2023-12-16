type ResponseErrorType = {
    code: number;
};

export class ResponseError extends Error implements ResponseErrorType {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}
