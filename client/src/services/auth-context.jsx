import { createContext, useState } from "react";

export const AuthContext = createContext({
    profile: null,
    setProfile: (data) => {},
});

const AuthContextProvider = ({ children }) => {
    const [profile, setProfile] = useState();

    const value = {
        profile,
        setProfile
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthContextProvider;