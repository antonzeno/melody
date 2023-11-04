import { atom } from "recoil";
import Cookies from "js-cookie";

export const authState = atom({
    key: "authState",
    default: {
        isAuthenticated: null,
        user: Cookies.get("__uid"),
    },
});
