import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { publicRoute } from "../route/public-route";
import { errorMiddleware } from "../middleware/error-middleware";

const web = express();
web.use(cors());
web.use(morgan(":remote-user [:date[clf]]  :method :url :status :res[content-length] - :response-time ms"));
web.use(express.json());
web.use(urlencoded({ extended: true }));

web.use(publicRoute);
web.use(errorMiddleware);

export { web };
