import React, { createContext, useState, useContext } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [regulation, setRegulation] = useState({
        bookMinAmountInput: 150,
        bookMaxAmountAllow: 300,
        debtMax: 20000,
        bookMinAmountAfterSell: 20,
        checkFee: true,
    });

    return (
        <ConfigContext.Provider value={{ regulation, setRegulation }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfigContext = () => useContext(ConfigContext);
