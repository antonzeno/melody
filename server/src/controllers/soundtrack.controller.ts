import express from "express";
import * as SoundtrackService from "../services/soundtrack.service";

export const uploadSoundtrack = async (request: express.Request, response: express.Response) => {
    try {
        const soundtrack = await SoundtrackService.uploadSoundtrack(request.body.data);
        return response.status(200).json(soundtrack);
    } catch (error) {
        return response.status(500).json({ error });
    }
};

export const getSoundtracksByUserId = async (request: express.Request, response: express.Response) => {
    try {
        const { id } = request.params;

        const soundtrack = await SoundtrackService.getSoundtrackById(parseInt(id));
        return response.status(200).json(soundtrack);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserSoundtracks = async (request: express.Request, response: express.Response) => {
    try {
        const { userId } = request.params;

        const soundtrack = await SoundtrackService.getSoundtracksByUserId(parseInt(userId));
        return response.status(200).json(soundtrack);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};
