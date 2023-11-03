import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/auth";

const GuardedRoute = ({ element: Element, ...rest }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useRecoilValue(authState);

    useEffect(() => {
        isAuthenticated === true && navigate(-1);
    });

    return isAuthenticated === true ? <></> : <Element {...rest} />;
};

export default GuardedRoute;
