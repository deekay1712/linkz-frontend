import axios from 'axios';

export const singUpCall = async (user) => {
    try {
        const response = await axios.post('/api/auth/signup', user);
        return response.data;
    }
    catch (error) {
        if(error.response.status === 409)
            alert("Email already exists");
        else
            console.log(error.response.data);
    }
}

export const loginCall = async (user, dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
        const response = await axios.post('/api/auth/login', user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    }
    catch (error) {
        console.log(error.response.data);
        dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
        return error.response.data;
    }
}

export const refreshTokenCall = async () => {
    try {
        const response = await axios.post("/api/auth/refresh", {}, {
            withCredentials: true
        }); 
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}   

export const verifyOtpCall = async (otp, userId) => {
    try {
        const response = await axios.post(`/api/auth/verify/${userId}`, { otp });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        if(error.response.data.message === 'Invalid OTP')
            alert("Invalid OTP");
        else
            console.log(error.response.data);
    }
}

export const resendOtpCall = async (userId) => {
    try {
        const response = await axios.post(`/api/auth/resend-otp/${userId}`);
        return response.data;
    }
    catch (error) {
        console.log(error.response.data);
    }
}

//Image upload
export const uploadImageCall = async (image, userId) => {
    try {
        const response = await axios.post(`/api/auth/upload/${userId}`, image);
        return response.data;
    }
    catch (error) {
        console.log(error.response.data);
    }
}

export const resetPasswordCall = async (userCredentials) => {
    try {
        const response = await axios.post('/api/auth/reset', userCredentials);
        return response.data;
    }
    catch (error) {
        console.log(error.response.data);
    }
}