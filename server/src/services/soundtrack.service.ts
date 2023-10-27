import { Soundtrack } from '@prisma/client'
import prisma from '../../prisma/client'
import lodash from 'lodash';

export const listSoundtracks = async (): Promise<Soundtrack[]> => {
    return prisma.soundtrack.findMany({
        select: {
            id: true,
            title: true,
            url: true,
            datePublished: true,
            updatedAt: true,
            user: true,
            userId: true
        }
    })
}

export const uploadSoundtrack = async (data: { title: string, url: string, userId: number }): Promise<Soundtrack> => {
    return prisma.soundtrack.create({
        data: {
            title: data.title,
            url: data.url,
            userId: data.userId,
            datePublished: new Date(),
        },
        select: {
            id: true,
            title: true,
            url: true,
            datePublished: true,
            updatedAt: true,
            user: false,
            userId: true
        }
    })
}

export const getSoundtrackById = async (id: number): Promise<Soundtrack> => {
    return prisma.soundtrack.findUnique({
        where: {
            id: id,
        }
    })
}

export const getSoundtracksByUserId = async (userId: number): Promise<Soundtrack[]> => {
    return prisma.soundtrack.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            url: true,
            datePublished: true,
            updatedAt: true,
            user: false,
            userId: true
        }
    })
}