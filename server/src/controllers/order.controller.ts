import express from "express";
import * as OrderService from "../services/order.service";

export const createOrder = async (req: express.Request, res: express.Response) => {
    try {
        const order = await OrderService.createOrder(req.body.data);
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
