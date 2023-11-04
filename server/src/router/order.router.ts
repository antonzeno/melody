import express from "express";
import { createOrder } from "../controllers/order.controller";

export default (router: express.Router) => {
    router.post("/order/create", createOrder);
};
