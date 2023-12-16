import "dotenv/config";
import prisma from "../application/database";
import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "../utils/jwt";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split("Bearer ")[1];
    if (!token) {
        return res
            .status(401)
            .json({
                status: "ERROR",
                message: "Unauthorized!",
            })
            .end();
    } else {
        try {
            const decodeToken = await decodeJwt(token);

            if (!decodeToken?.email) {
                return res
                    .status(401)
                    .json({
                        status: "ERROR",
                        message: "Unauthorized!",
                    })
                    .end();
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: decodeToken.email,
                },
                select: {
                    name: true,
                    email: true,
                    token: true,
                },
            });

            if (!user) {
                return res
                    .status(401)
                    .json({
                        status: "ERROR",
                        message: "Unauthorized!",
                    })
                    .end();
            } else {
                req.user = user;
                next();
            }
        } catch (err) {
            next(err);
        }
    }
};

export { authMiddleware };
