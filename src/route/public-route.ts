import express from "express";
import helloController from "../controller/hello-controller";
import userController from "../controller/user-controller";
const publicRoute = express.Router();

publicRoute.get(`/`, helloController.hello);
publicRoute.post(`/api/login`, userController.login);
publicRoute.post(`/api/register`, userController.register);

export { publicRoute };
