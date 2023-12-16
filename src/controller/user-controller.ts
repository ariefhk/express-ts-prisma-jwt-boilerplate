import userService from "../service/user-service";
import { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            status: "SUCCESS",
            message: "success register user!",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            status: "SUCCESS",
            message: "success login user!",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        res.status(200).json({
            status: "SUCCESS",
            message: "success get user!",
            data: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (e) {
        next(e);
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (user?.token) {
            await userService.logout({
                email: user.email,
                token: user.token,
            });
            res.status(200).json({
                status: "SUCCESS",
                message: `${user.email} successfully logged out!`,
            });
        }
    } catch (e) {
        next(e);
    }
};

export default { register, login, get, logout };
