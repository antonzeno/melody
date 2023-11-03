import express from "express";
import * as UserService from "../services/user.service";
import { checkAuth } from "../middlewares/auth.middleware";
import { login } from "../controllers/user.controller";

export default (router: express.Router) => {
    router.get("/users", async (request: express.Request, response: express.Response) => {
        try {
            const users = await UserService.listUsers();

            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.post("/user/register", async (request: express.Request, response: express.Response) => {
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
    });

    router.post("/user/login", login);

    router.get("/user/checkAuth", checkAuth, async (request: express.Request, response: express.Response) => {
        const userData = await UserService.getUserById(request.user.id);
        return response.status(200).json({ user: userData });
    });

    router.get("/user/logout", (request: express.Request, response: express.Response) => {
        try {
            response.cookie("jwt", null, { expires: new Date(0) });
            response.cookie("__uid", null, { expires: new Date(0) });

            return response.status(200).json("Success");
        } catch (error) {
            return response.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.put("/user/update", checkAuth, async (request: express.Request, response: express.Response) => {
        try {
            const { userData } = request.body;

            const user = await UserService.updateUser(userData);
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/user/:id", async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;

            const user = await UserService.getUserById(parseInt(id));
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ error: "Internal Server Error" });
        }
    });
};
