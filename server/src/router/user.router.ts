import express from 'express';
import * as UserService from '../services/user.service'
import jwt from 'jsonwebtoken'


export default (router: express.Router) => {
    router.get('/users', async (request: express.Request, response: express.Response) => {
        try {
            const users = await UserService.listUsers();

            return response.status(200).json(users)
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    })

    router.post('/user/register', async (request: express.Request, response: express.Response) => {
        try {
            const existingUser = await UserService.getUserByEmail(request.body.email)
            if (existingUser) {
                return response.status(403).json('User already exists')

            }

            const user = await UserService.register(request.body)

            return response.status(200).json(user)
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }

    })

    router.post('/user/login', async (request: express.Request, response: express.Response) => {
        try {
            const user = await UserService.getUserByEmail(request.body.email)
            if (!user) {
                return response.status(403).json('User does not exist')

            }

            request.body.hashedPassword = user.password;

            const match = await UserService.login(request.body)

            if (!match) {
                return response.status(403).json('Invalid credentials');
            }

            const token = jwt.sign({
                userId: user.id,
                email: user.email
            }, 'secretKey', { expiresIn: '1h' });

            return response.status(200).json({ token, user });
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }

    })
}