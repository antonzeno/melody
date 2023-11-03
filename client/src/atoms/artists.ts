import { atom } from "recoil";

export const cachedArtists = atom({
    key: "cachedArtists",
    default: [],
});
