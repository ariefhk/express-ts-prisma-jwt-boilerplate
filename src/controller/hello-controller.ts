import { Request, Response } from "express";

const hello = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello welcome to API!",
    });
};

export default { hello };
