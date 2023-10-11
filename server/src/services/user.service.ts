import { User } from '@prisma/client'
import prisma from '../../prisma/client'
import { generateSaltedHash, verifyPassword } from '../utils/utils'

export const listUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            registeredAt: true,
            updatedAt: true,
        }
    })
}

export const register = async (userData: { name: string, email: string, password: string }): Promise<User> => {
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
        }
    })
}

export const login = async (userData: { email: string, password: string, hashedPassword: string }): Promise<boolean> => {
    const verified = await verifyPassword(userData.password, userData.hashedPassword)

    return verified;
}

export const getUserByEmail = async (email: string): Promise<User> => {
    return prisma.user.findUnique({
        where: {
            email: email,
        }
    })
}