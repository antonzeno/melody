import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/auth";
import { useCookies } from "react-cookie";

export const useAuthentication = () => {
    const [{ isAuthenticated, user }, setAuth] = useRecoilState(authState);
    const [cookies] = useCookies(["__uid"]);

    useEffect(() => {
        const isAuthenticated = cookies["__uid"] !== undefined;
        setAuth({ isAuthenticated, user: cookies["__uid"] });
    }, [cookies]);

    return { isAuthenticated, user };
};
