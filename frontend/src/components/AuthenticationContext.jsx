import React, { createContext, useState, useContext } from 'react';
const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthentications = () => useContext(AuthenticationContext);
