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
            const user = await prisma.user.findFirst({
                where: {
                    token: token,
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
                if (user?.token) {
                    const decodeToken = await decodeJwt(user.token);
                    if (!decodeToken?.email) {
                        return res
                            .status(401)
                            .json({
                                status: "ERROR",
                                message: "Unauthorized!",
                            })
                            .end();
                    }
                    req.user = user;
                    next();
                }
            }
        } catch (err) {
            next(err);
        }
    }
};

export { authMiddleware };
