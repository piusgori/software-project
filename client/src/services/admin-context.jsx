import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState();

    const value = { 
        admin,
        setAdmin,
     };
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
};

export default AdminContextProvider;