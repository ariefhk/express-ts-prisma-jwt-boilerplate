import { z } from "zod";

const registerUserValidation = z.object({
    name: z.string().min(4).max(100),
    email: z.string().email().min(1, { message: "This field must be filled!" }),
    password: z.string().min(8).max(100),
});

const loginUserValidation = z.object({
    email: z.string().email().min(1, { message: "This field must be filled!" }),
    password: z.string().min(8).max(100),
});

const logoutUserValidation = z.object({
    email: z.string().email().min(1, { message: "This field must be filled!" }),
    token: z.string(),
});

export type registerUserValidation = z.infer<typeof registerUserValidation>;
export type loginUserValidation = z.infer<typeof loginUserValidation>;
export type logoutUserValidation = z.infer<typeof logoutUserValidation>;

export { registerUserValidation, loginUserValidation, logoutUserValidation };
