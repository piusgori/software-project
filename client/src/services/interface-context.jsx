import { createContext, useState } from "react";

export const InterfaceContext = createContext({
    drawerOpen: false,
    closeDrawer: (bool) => {},
    openDrawer: (bool) => {},
});

const InterfaceContextProvider = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => { setDrawerOpen(true) };

    const closeDrawer = () => { setDrawerOpen(false) };

    const value = {
        closeDrawer,
        drawerOpen,
        openDrawer,
    };

    return <InterfaceContext.Provider value={value}>{children}</InterfaceContext.Provider>
};

export default InterfaceContextProvider;