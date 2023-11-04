import express from "express";
import * as UserService from "../services/user.service";
import jwt from "jsonwebtoken";

export const login = async (request: express.Request, response: express.Response) => {
    try {
        const user = await UserService.getUserByEmail(request.body.email);
        if (!user) {
            return response.status(403).json("User does not exist");
        }

        request.body.hashedPassword = user.password;

        const match = await UserService.login(request.body);
        if (!match) {
            return response.status(403).json("Invalid credentials");
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                photo: user.photo,
            },
            "secretKey",
            { expiresIn: "1h" }
        );

        response.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
        });

        response.cookie(
            "__uid",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                photo: user.photo,
            }),
            {
                secure: true,
                maxAge: 3600000,
            }
        );

        return response.status(200).json({ user });
    } catch (error) {
        return response.status(500).json({ error: JSON.stringify(error) });
    }
};

export const register = async (request: express.Request, response: express.Response) => {
    try {
        console.log(request.body);
        const existingUser = await UserService.getUserByEmail(request.body.email);
        if (existingUser) {
            return response.status(403).json("User already exists");
        }

        const user = await UserService.register(request.body);

        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (request: express.Request, response: express.Response) => {
    try {
        response.cookie("jwt", null, { expires: new Date(0) });
        response.cookie("__uid", null, { expires: new Date(0) });

        return response.status(200).json("Success");
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateAuthUser = async (request: express.Request, response: express.Response) => {
    try {
        const { userData } = request.body;

        const user = await UserService.updateUser(userData);
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};

export const checkUser = async (request: express.Request, response: express.Response) => {
    const userData = await UserService.getUserById(request.user.id);
    return response.status(200).json({ user: userData });
};

export const getUserById = async (request: express.Request, response: express.Response) => {
    try {
        const { id } = request.params;

        const user = await UserService.getUserById(parseInt(id));
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllUsers = async (request: express.Request, response: express.Response) => {
    try {
        const users = await UserService.listUsers();

        return response.status(200).json(users);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};
