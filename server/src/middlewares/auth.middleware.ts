import express from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export const checkAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, "secretKey", (err: any, decodedToken: any) => {
        if (err) {
            return res.status(401).json("Unauthorized");
        }
        req.user = decodedToken;
        next();
    });
};
