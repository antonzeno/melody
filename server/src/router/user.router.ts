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
            console.log(request.body)
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

            response.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });

            return response.status(200).json({ user });
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }

    })

    router.get('/user/checkAuth', (request: express.Request, response: express.Response) => {
        try {
            const token = request.cookies.jwt;
            if (!token) {
                return response.status(401).json('Unauthorized');
            }

            jwt.verify(token, 'secretKey', (err: any, decodedToken: any) => {
                if (err) {
                    return response.status(401).json('Unauthorized');
                }

                return response.status(200).json({ user: decodedToken });
            });
        } catch (error) {
            console.error('Error checking login status:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/user/logout', (request: express.Request, response: express.Response) => {
        try {
            response.cookie('jwt', null, { expires: new Date(0) });

            return response.status(200).json('Success');
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    });

}