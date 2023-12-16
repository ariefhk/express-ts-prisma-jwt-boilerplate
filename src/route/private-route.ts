import express from "express";
import helloController from "../controller/hello-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const privateRoute = express.Router();
privateRoute.use(authMiddleware);

privateRoute.get(`/me`, helloController.hello);

export { privateRoute };
