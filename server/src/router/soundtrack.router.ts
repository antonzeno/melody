import express from "express";
import * as SoundtrackService from "../services/soundtrack.service";

export default (router: express.Router) => {
    router.post(
        "/soundtrack/upload",
        async (request: express.Request, response: express.Response) => {
            try {
                const soundtrack = await SoundtrackService.uploadSoundtrack(
                    request.body.data,
                );
                return response.status(200).json(soundtrack);
            } catch (error) {
                return response.status(500).json({ error });
            }
        },
    );

    router.get(
        "/soundtrack/:id",
        async (request: express.Request, response: express.Response) => {
            try {
                const { id } = request.params;

                const soundtrack = await SoundtrackService.getSoundtrackById(
                    parseInt(id),
                );
                return response.status(200).json(soundtrack);
            } catch (error) {
                return response
                    .status(500)
                    .json({ error: "Internal Server Error" });
            }
        },
    );

    router.put(
        "/soundtrack/upload/:id?",
        async (request: express.Request, response: express.Response) => {
            try {
                const { id } = request.params;
                console.log(id);

                // return response.status(200).json(soundtrack);
            } catch (error) {
                return response
                    .status(500)
                    .json({ error: "Internal Server Error" });
            }
        },
    );

    router.get(
        "/soundtracks/user/:userId",
        async (request: express.Request, response: express.Response) => {
            try {
                const { userId } = request.params;

                const soundtrack =
                    await SoundtrackService.getSoundtracksByUserId(
                        parseInt(userId),
                    );
                return response.status(200).json(soundtrack);
            } catch (error) {
                return response
                    .status(500)
                    .json({ error: "Internal Server Error" });
            }
        },
    );
};
