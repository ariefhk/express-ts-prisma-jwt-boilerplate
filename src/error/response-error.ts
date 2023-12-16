type ResponseErrorType = {
    code: number;
    errData?: object | object[];
};

export class ResponseError extends Error implements ResponseErrorType {
    public code: number;
    public errData?: object | object[];

    constructor(code: number, message: string, errData?: object | object[]) {
        super(message);
        this.code = code;
        this.errData = errData;
    }
}
