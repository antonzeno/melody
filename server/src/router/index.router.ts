import express from "express";
import userRouter from "./user.router";
import soundtrackRouter from "./soundtrack.router";
import orderRouter from "./order.router";

const router = express.Router();

export default (): express.Router => {
    userRouter(router);
    soundtrackRouter(router);
    orderRouter(router);

    return router;
};
