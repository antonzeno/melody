import axios from 'axios';
import { deleteCookie, encryptCookie } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState, userState } from '../atoms/auth';

export const useAuthentication = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    const syncUser = async () => {
        try {
            axios.interceptors.request.use(
                (config) => {
                    config.withCredentials = true;
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/checkAuth`);

            if (response.status === 200) {
                setAuth(true);
                setUser(response.data.user);
                encryptCookie('sessionId', response.data.user);
            } else {
                deleteCookie('sessionId');
                navigate('/login');
            }
        } catch (error) {
            deleteCookie('sessionId');
            navigate('/login');
        }
    };

    return { auth, user, syncUser, setUser };
};
