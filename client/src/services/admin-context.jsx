import axios from "axios";
import { createContext, useState } from "react";
import { SERVER_URL } from "../utils/data";

export const AdminContext = createContext({
    admin: null,
    addField: (form) => {},
    adminLogin: (form) => {},
    getAnswers: () => {},
    getQuestions: () => {},
    getUsers: () => {},
});

const AdminContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState();

    const adminLogin = async (data) => {
        try {
            const response = await axios.post(`${SERVER_URL}/admin/login`, data);
            setAdmin(response.data.admin);
        } catch (err) {
            throw err;
        }
    };

    const addField = async (form) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${admin?.token}` } };
            await axios.post(`${SERVER_URL}/admin/field`, form, config);
        } catch (err) {
            throw err;
        }
    }

    const getQuestions = async () => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${admin?.token}` } };
            const { data } = await axios.get(`${SERVER_URL}/admin/questions`, config);
            return data.questions
        } catch (err) {
            throw err;
        }
    };

    const getUsers = async () => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${admin?.token}` } };
            const { data } = await axios.get(`${SERVER_URL}/admin/users`, config);
            return data.users
        } catch (err) {
            throw err;
        }
    };

    const getAnswers = async () => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${admin?.token}` } };
            const { data } = await axios.get(`${SERVER_URL}/admin/answers`, config);
            return data.answers
        } catch (err) {
            throw err;
        }
    };

    const value = { 
        addField,
        admin,
        adminLogin,
        getAnswers,
        getQuestions,
        getUsers,
        setAdmin,
     };
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
};

export default AdminContextProvider;