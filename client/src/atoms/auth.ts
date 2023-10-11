// atoms/auth.js
import { atom } from 'recoil';

export const authState = atom({
    key: 'authState',
    default: null,
});

export const userState = atom({
    key: 'userState',
    default: null,
});