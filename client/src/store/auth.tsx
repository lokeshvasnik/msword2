import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    storeTokenInLS: (serverToken: any) => void;
    LogoutUser: () => void;
    isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const storeTokenInLS = (serverToken: any) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const isLoggedIn = !!token;

    // useEffect to synchronize state with local storage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken !== token) {
            setToken(storedToken);
        }
    }, [token]);

    const contextValue: AuthContextType = {
        storeTokenInLS,
        LogoutUser,
        isLoggedIn,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
