import express from "express";
import helloController from "../controller/hello-controller";
const publicRoute = express.Router();

publicRoute.get(`/`, helloController.hello);

export { publicRoute };
