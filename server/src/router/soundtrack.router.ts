import express from "express";
import { uploadSoundtrack, getSoundtracksByUserId, getUserSoundtracks } from "../controllers/soundtrack.controller";

export default (router: express.Router) => {
    router.post("/soundtrack/upload", uploadSoundtrack);
    router.get("/soundtrack/:id", getSoundtracksByUserId);
    router.get("/soundtracks/user/:userId", getUserSoundtracks);
};
