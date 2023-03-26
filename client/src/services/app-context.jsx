import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { SERVER_URL } from "../utils/data";
import { AuthContext } from "./auth-context";

export const AppContext = createContext({
    fields: [],
    answerQuestion: (form) => {},
    askQuestion: (form) => {},
    getFields: () => {},
    getSimilarQuestions: (id) => {},
    getTopQuestions: () => {},
    questionAnswers: (id) => {},
    singleQuestion: (id) => {},
    unvoteAnswer: (id) => {},
    voteAnswer: (id) => {},
});

const AppContextProvider = ({ children }) => {
    const { profile, setProfile } = useContext(AuthContext);

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

    const getSimilarQuestions = async (id) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            const { data } = await axios.get(`${SERVER_URL}/related-questions/${id}`, config);
            return data.questions;
        } catch (err) {
            throw err;
        }
    }

    const askQuestion = async (form) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.post(`${SERVER_URL}/add-question`, form, config);
        } catch (err) {
            throw err;
        }
    };

    const singleQuestion = async (id) => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/question/${id}`);
            return data.question;
        } catch (err) {
            throw err;
        }
    };

    const questionAnswers = async (id) => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/question-answers/${id}`);
            return data.answers;
        } catch (err) {
            throw err;
        }
    };

    const answerQuestion = async (form) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            const { data } = await axios.post(`${SERVER_URL}/answer-question`, form, config);
            return data.answer;
        } catch (err) {
            throw err;
        }
    };

    const voteAnswer = async (id) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.patch(`${SERVER_URL}/vote/${id}`, {}, config);
            setProfile(prev => ({ ...prev, votedAnswers: [...prev.votedAnswers, id] }));
        } catch (err) {
            throw err;
        }
    };

    const unvoteAnswer = async (id) => {
        try {
            const config = { headers: { 'Authorization': `Bearer ${profile?.token}` } };
            await axios.patch(`${SERVER_URL}/unvote/${id}`, {}, config);
            setProfile(prev => ({ ...prev, votedAnswers: prev.votedAnswers.filter(e => e !== id) }));
        } catch (err) {
            throw err;
        }
    }

    const value = {
        answerQuestion,
        askQuestion,
        fields,
        getFields,
        getSimilarQuestions,
        getTopQuestions,
        questionAnswers,
        singleQuestion,
        unvoteAnswer,
        voteAnswer,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};

export default AppContextProvider;