import { Order } from "@prisma/client";
import prisma from "../../prisma/client";

export const createOrder = async (data: { amount: number; userId: number; artistId: number }): Promise<Order> => {
    return prisma.order.create({
        data: {
            amount: data.amount,
            userId: data.userId,
            artistId: data.artistId,
            date: new Date(),
        },
        select: {
            id: true,
            amount: true,
            user: false,
            artist: false,
            date: true,
            userId: true,
            artistId: true,
        },
    });
};
