import React, { createContext, useState, useContext } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [rules, setRules] = useState({
        minInputBook: 150,
        maxStoredBook: 300,
        minStoredAfterSelling: 20000,
        maxBoughtBook: 20,
        allowDebt: true,
    });

    return (
        <ConfigContext.Provider value={{ rules, setRules }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
