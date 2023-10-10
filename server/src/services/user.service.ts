import { User } from '@prisma/client'
import prisma from '../../prisma/client'


export const listUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            password: true,
            registeredAt: true,
            updatedAt: true,
        }
    })
}