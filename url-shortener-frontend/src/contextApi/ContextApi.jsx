import { createContext, useContext, useState, useCallback, useMemo } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const [token, setTokenState] = useState(() => {
        // Initialize token from localStorage only once
        try {
            const savedToken = localStorage.getItem("JWT_TOKEN");
            return savedToken ? JSON.parse(savedToken) : null;
        } catch {
            localStorage.removeItem("JWT_TOKEN");
            return null;
        }
    });

    // Memoized token update function
    const setToken = useCallback((newToken) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem("JWT_TOKEN", JSON.stringify(newToken));
        } else {
            localStorage.removeItem("JWT_TOKEN");
        }
    }, []);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        token,
        setToken,
    }), [token, setToken]);

    return <ContextApi.Provider value={contextValue}>{children}</ContextApi.Provider>
};

export const useStoreContext = () => {
    const context = useContext(ContextApi);
    if (!context) {
        throw new Error("useStoreContext must be used within a ContextProvider");
    }
    return context;
}