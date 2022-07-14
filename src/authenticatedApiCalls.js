//Authenticated api calls
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import jwtDecode from 'jwt-decode';
import {refreshTokenCall} from './apiCalls';
import axios from 'axios';

function refreshCall(accessToken) {
    const axiosJWT =  axios.create();
    axiosJWT.interceptors.request.use(
        async(config) => {
            // const { accessToken } = useContext(AuthContext);
            let currentDate = new Date();
            let expiryDate = new Date(jwtDecode(accessToken).exp * 1000);
            if (currentDate > expiryDate) {
                const response = await refreshTokenCall();
                config.headers['authorization'] = `Bearer ${response.accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosJWT; 
}

// get user data
export const getUserData = async (accessToken) => {
    const axiosJWT = refreshCall(accessToken);
    const response = await axiosJWT.get('/api/auth/', {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });
    return response.data;
}

//Logout
export const logout = async (accessToken) => {
    console.log(accessToken);
    const axiosJWT = refreshCall(accessToken);
    const response = await axiosJWT.post('/api/auth/logout/', {}, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });
    return response.data;
}