import express from 'express';
import * as UserService from '../services/user.service'


export default (router: express.Router) => {
    router.get('/users', async (request: express.Request, response: express.Response) => {
        try {
            const users = await UserService.listUsers();

            return response.status(200).json(users)
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    })
}

