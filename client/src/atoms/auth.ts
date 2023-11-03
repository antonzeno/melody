import { atom } from "recoil";
import Cookies from "js-cookie";
import { decryptCookie } from "../utils/utils";

export const authState = atom({
    key: "authState",
    default: Cookies.get("sessionId") != null,
});

export const userState = atom({
    key: "userState",
    default: decryptCookie(Cookies.get("sessionId")),
});
