import { createContext } from "react";

export const InterfaceContext = createContext();

const InterfaceContextProvider = ({ children }) => {
    const value = {};

    return <InterfaceContext.Provider value={value}>{children}</InterfaceContext.Provider>
};

export default InterfaceContextProvider;