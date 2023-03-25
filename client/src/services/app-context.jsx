import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { SERVER_URL } from "../utils/data";
import { AuthContext } from "./auth-context";

export const AppContext = createContext({
    fields: [],
    askQuestion: (form) => {},
    getFields: () => {},
    getTopQuestions: () => {},
});

const AppContextProvider = ({ children }) => {
    const { profile } = useContext(AuthContext);

    const [fields, setFields] = useState([]);

    const getFields = async () => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/fields`);
            setFields(data.fields);
        } catch (err) {
            throw err;
        }
    }

    const getTopQuestions = async () => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            const { data } = await axios.get(`${SERVER_URL}/top-questions`, config);
            return data.questions;
        } catch (err) {
            throw err;
        }
    };

    const askQuestion = async (form) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.post(`${SERVER_URL}/add-question`, form, config);
        } catch (err) {
            throw err;
        }
    }

    const value = {
        askQuestion,
        fields,
        getFields,
        getTopQuestions,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};

export default AppContextProvider;