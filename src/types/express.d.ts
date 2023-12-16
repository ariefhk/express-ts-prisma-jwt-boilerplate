import { Express, Request, Response } from "express";

type UserType = {
    name: string;
    email: string;
    token: string | null;
};

declare global {
    namespace Express {
        // extend the built in User with your own custom properties
        interface User extends CustomUser {}

        // Extend the request and response objects with your own custom properties
        export interface Request {
            user: UserType;
        }
        export interface Response {
            locals: {
                allowedRoles?: string[];
            };
        }
    }
}
