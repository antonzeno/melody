import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const checkCookie = (cookieName: string) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(`${cookieName}=`)) {
            return true;
        }
    }
    return false;
};

export const decryptCookie = (name: string) => {
    const encrypted = Cookies.get(name);
    if (!encrypted) {
        return false;
    }
    const decrypted = CryptoJS.AES.decrypt(
        encrypted,
        process.env.REACT_APP_SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
};

export const encryptCookie = (
    name: string,
    data: string | Map<string, string>,
): void => {
    console.log(process.env.REACT_APP_SECRET_KEY);
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.REACT_APP_SECRET_KEY,
    ).toString();
    const expiryDuration = 60 * 60 * 1000;
    const expiryDate = new Date(Date.now() + expiryDuration);
    const formattedExpiryDate = expiryDate.toUTCString();
    document.cookie = `${name}=${encrypted}; path=/; expires=${formattedExpiryDate}; Secure; SameSite=None`;
};

export const deleteCookie = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
