import { createContext, useState } from "react";
import axios from 'axios';
import { SERVER_URL } from "../utils/data";

export const AppContext = createContext({
    fields: [],
    getFields: () => {},
});

const AppContextProvider = ({ children }) => {
    const [fields, setFields] = useState([]);

    const getFields = async () => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/fields`);
            setFields(data.fields);
        } catch (err) {
            throw err;
        }
    }

    const value = {
        fields,
        getFields
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};

export default AppContextProvider;