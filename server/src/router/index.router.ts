import express from "express";
import userRouter from "./user.router";
import soundtrackRouter from "./soundtrack.router";

const router = express.Router();

export default (): express.Router => {
    userRouter(router);
    soundtrackRouter(router);

    return router;
};
