import { User } from "@prisma/client";
import prisma from "../../prisma/client";
import { generateSaltedHash, verifyPassword } from "../utils/utils";

export const listUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            registeredAt: true,
            updatedAt: true,
            photo: true,
        },
    });
};

export const register = async (userData: { name: string; email: string; password: string }): Promise<User> => {
    const hash = await generateSaltedHash(userData.password);

    return prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            registeredAt: true,
            updatedAt: true,
            photo: true,
        },
    });
};

export const login = async (userData: {
    email: string;
    password: string;
    hashedPassword: string;
}): Promise<boolean> => {
    const verified = await verifyPassword(userData.password, userData.hashedPassword);

    return verified;
};

export const getUserByEmail = async (email: string): Promise<User> => {
    return prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};

export const getUserById = async (id: number, userId?: number) => {
    let user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    let orderCount = 0;
    if (user) {
        orderCount = await prisma.order.count({
            where: {
                artistId: id,
                userId: userId,
            },
        });
    }

    return { ...user, orders: orderCount };
};

export const updateUser = async (userData: {
    id: number;
    name: string;
    email: string;
    password?: string;
    photo: string;
}): Promise<User> => {
    return prisma.user.update({
        where: {
            id: userData.id,
        },
        data: {
            name: userData.name,
            email: userData.email,
            photo: userData.photo,
        },
    });
};
