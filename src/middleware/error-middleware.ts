import "dotenv/config";
import { ResponseError } from "../error/response-error";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!err) {
        return next();
    }

    if (err instanceof ResponseError) {
        if (!err.errData) {
            return res
                .status(err.code)
                .json({
                    status: "ERROR",
                    message: err.message,
                })
                .end();
        }
        return res
            .status(err.code)
            .json({
                status: "ERROR",
                message: err.message,
                data: err.errData,
            })
            .end();
    } else {
        if (process.env.NODE_ENV === "development") {
            console.log(err);
        }
        return res
            .status(500)
            .json({
                status: "ERROR",
                message: "service error!",
            })
            .end();
    }
};

export { errorMiddleware };
