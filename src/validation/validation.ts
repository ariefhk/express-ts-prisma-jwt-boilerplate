import { ResponseError } from "../error/response-error";
import { ZodError, ZodIssue, ZodSchema } from "zod";

const validate = (schema: ZodSchema, request: object | string) => {
    try {
        return schema.parse(request);
    } catch (err) {
        if (err instanceof ZodError) {
            const listError = err.errors.map((zodErr: ZodIssue) => zodErr.message);
            throw new ResponseError(400, "Bad Request", listError);
        }
    }
};

export { validate };
