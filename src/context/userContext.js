import React, {useState, useEffect, useMemo, createContext, useContext, ReactNode, useCallback} from 'react';
import {toast} from "react-toastify";
import {api} from "../config/api";

export const UserContext = createContext({
    isAuthenticated: false, 
    onLogout: () => {},
    onLogin: async () => {},
});

export const UserContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onLogout = useCallback(() => {
        localStorage.removeItem("authToken");

        setIsAuthenticated(false);

        toast.success("Vous êtes déconnecter !")
    }, []);

    const onLogin = async (values) => {
        try {
            const response = await api.post("/auth/login", values);

            localStorage.setItem("authToken", response?.data?.authToken);

            setIsAuthenticated(true);

            toast.success('Vous êtes connecté !')
        } catch(err) {
            console.log(err);
            toast.error(err?.response?.data || "");
        }
    }

    const checkIsLogged = async () => {
        try {
            await api.get("/auth/check-token");

            setIsAuthenticated(true)
        } catch (err) {
            onLogout();
            console.error(err);
        }
    };

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);

            checkIsLogged();
        }
    }, []);

    const value = useMemo(() => {
        return {
            isAuthenticated,
            onLogout,
            onLogin,
        }
    }, [isAuthenticated])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}
