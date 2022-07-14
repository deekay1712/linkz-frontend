import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";
import { refreshTokenCall } from "../apiCalls";
import { getUserData } from "../authenticatedApiCalls";

const INITIAL_STATE = {
    isLoading: false,
    error: null,
    accessToken: null,
    user: null
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        try{
            const refreshed = async () => {
                const response = await refreshTokenCall();
                dispatch({ type: "REFRESH_TOKEN_SUCCESS", payload: response });
                const loginResponse = await getUserData(response.accessToken);
                dispatch({ type: "SET_USER_DATA", payload: loginResponse });
            }
            refreshed();
        }catch(error){
            console.log("User not logged in");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
