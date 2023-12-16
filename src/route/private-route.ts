import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import userController from "../controller/user-controller";

const privateRoute = express.Router();
privateRoute.use(authMiddleware);

privateRoute.get(`/api/me`, userController.get);
privateRoute.put(`/api/logout`, userController.logout);

export { privateRoute };
