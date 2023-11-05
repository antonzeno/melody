import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import {
    login,
    register,
    logout,
    checkUser,
    updateAuthUser,
    searchUsers,
    getUserById,
} from "../controllers/user.controller";

export default (router: express.Router) => {
    router.post("/user/register", register);
    router.post("/user/login", login);
    router.get("/users", searchUsers);
    router.get("/user/checkAuth", checkUser);
    router.get("/user/logout", logout);
    router.put("/user/update", checkAuth, updateAuthUser);
    router.get("/user/:id", getUserById);
};
