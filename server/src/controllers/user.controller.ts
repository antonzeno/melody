import express from "express";
import * as UserService from "../services/user.service";
import jwt from "jsonwebtoken";
import { encrypt } from "../utils/utils";

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
