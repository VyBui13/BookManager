import React, { createContext, useState, useContext } from 'react';
const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
    const [authorization, setAuthorization] = useState(null);

    return (
        <AuthorizationContext.Provider value={{ authorization, setAuthorization }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorizations = () => useContext(AuthorizationContext);
