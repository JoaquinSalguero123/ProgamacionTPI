import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(
        localStorage.getItem("Token")
    );
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authToken) {
            try {
                const decoded = jwtDecode(authToken);

                setUser({
                    email: decoded.email,
                    role: Number(decoded.role),
                });
            } catch (error) {
                // token inválido
                localStorage.removeItem("Token");
                setAuthToken(null);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [authToken]);



    // helpers
    const login = (token) => {
        localStorage.setItem("Token", token);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem("Token");
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authToken,
                isSignedIn: !!authToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);