import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atoms/auth';

const AuthGuardedRoute = ({ element: Element, ...rest }) => {
    const navigate = useNavigate();
    const auth = useRecoilValue(authState);

    useEffect(() => {
        auth !== true && navigate('/login');
    })



    return auth !== true ? <Outlet /> : <Element {...rest} />;
};

export default AuthGuardedRoute;
