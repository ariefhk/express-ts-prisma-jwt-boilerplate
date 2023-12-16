import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";

const web = express();
web.use(cors());
web.use(morgan(":remote-user [:date[clf]]  :method :url :status :res[content-length] - :response-time ms"));
web.use(express.json());
web.use(urlencoded({ extended: true }));

export { web };
